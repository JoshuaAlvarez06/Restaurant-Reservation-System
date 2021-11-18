import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main style={{ maxWidth: "100vw" }}>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <div className="dashboardHeader">
          <div className="dayButtons mb-3">
            <button
              onClick={() => history.push(`/dashboard`)}
              className="btn btn-info mr-2"
            >
              Today
            </button>
            <button
              onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
              className="btn btn-secondary mr-2"
            >
              Previous
            </button>

            <button
              onClick={() => history.push(`/dashboard?date=${next(date)}`)}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="table">
        <thead>
          <tr className="reservations-head">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
            <th>People</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.mobile_number}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.people}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
