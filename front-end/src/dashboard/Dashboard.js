import React, { useEffect, useState } from 'react';
import { listReservations, listTables } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import { Link, useHistory } from 'react-router-dom';
import { previous, next } from '../utils/date-time';
import './Dashboard.css';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables().then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main style={{ maxWidth: '100vw' }}>
      <h1 className='mt-3'>Dashboard</h1>
      <div className='d-md-flex mb-3'>
        <div className='dashboardHeader'>
          <div className='dayButtons mt-3 mb-3'>
            <button
              onClick={() => history.push(`/dashboard`)}
              className='btn btn-info mr-2'
            >
              Today
            </button>
            <button
              onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
              className='btn btn-secondary mr-2'
            >
              Previous
            </button>

            <button
              onClick={() => history.push(`/dashboard?date=${next(date)}`)}
              className='btn btn-secondary'
            >
              Next
            </button>
          </div>
          <h4 className='mb-0'>Reservations for {date}</h4>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className='table'>
        <thead>
          <tr className='reservations-head'>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Reservation Time</th>
            <th>People</th>
            <th>Seat</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            const reservation_id = reservation.reservation_id;

            return (
              <tr key={reservation.reservation_id}>
                <td>
                  {reservation.first_name} {reservation.last_name}
                </td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td>
                  <button className='btn btn-info'>
                    <Link
                      className='text-decoration-none text-white'
                      to={`/reservations/${reservation_id}/seat`}
                    >
                      Seat
                    </Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4 className='mt-4 mb-0'>Tables</h4>
      <ErrorAlert error={tablesError} />
      <div className='tablesSection'>
        {tables.map((table) => (
          <div key={table.table_id} className='tableCard'>
            <p className='tableHeader'>{table.table_name}</p>
            <p
              className='tableStatus'
              data-table-id-status={`${table.table_id}`}
            >
              {table.reservation_id ? 'occupied' : 'free'}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
