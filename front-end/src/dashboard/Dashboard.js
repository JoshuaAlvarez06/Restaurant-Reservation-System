import React, { useEffect, useState } from 'react';
import { deleteSeat, listReservations, listTables } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import { useHistory } from 'react-router-dom';
import { previous, next } from '../utils/date-time';
import Tables from './Tables';
import './Dashboard.css';
import ReservationView from './ReservationView';

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

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables().then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const finished = (tableId) => {
    deleteSeat(tableId).then(loadDashboard).catch(setReservationsError);
  };

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
      <div className='dashboard__content'>
        <div className='reservationsList'>
          {reservations.map((reservation) => (
            <ReservationView
              reservation={reservation}
              loadDashboard={loadDashboard}
              setReservationsError={setReservationsError}
            />
          ))}
        </div>

        <Tables
          loadDashboard={loadDashboard}
          finished={finished}
          tables={tables}
          tablesError={tablesError}
        />
      </div>
    </main>
  );
}

export default Dashboard;
