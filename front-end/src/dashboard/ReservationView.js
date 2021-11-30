import React from 'react';
import { Link } from 'react-router-dom';
import { updateStatus } from '../utils/api';
import './ReservationView.css';

const ReservationView = ({
  reservation,
  loadDashboard,
  setReservationsError,
}) => {
  const cancelRes = () => {
    const cancelConfirm = window.confirm(
      'Do you want to cancel this reservation?\n\nThis cannot be undone.'
    );
    if (cancelConfirm) {
      updateStatus(reservation.reservation_id, { status: 'cancelled' })
        .then(loadDashboard)
        .catch(setReservationsError);
    }
  };

  return (
    <div className='reservation' key={reservation.reservation_id}>
      <div className='reservation__container'>
        <div className='reservation__info'>
          <p className='reservation__name'>
            Name: {reservation.first_name} {reservation.last_name}
          </p>
          <p className='reservation__number'>
            Mobile Number: {reservation.mobile_number}
          </p>
          <p className='reservation__time'>
            Time: {reservation.reservation_time}
          </p>
          <p className='reservation__size'>Size: {reservation.people}</p>
          <p
            className='reservation__status'
            data-reservation-id-status={reservation.reservation_id}
          >
            Status: {reservation.status}
          </p>
        </div>
        <div className='reservation__btnGroup'>
          {reservation.status === 'booked' && (
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button className='btn btn-primary'>Seat</button>
            </Link>
          )}
          <Link to={`/reservations/${reservation.reservation_id}/edit`}>
            <button className='btn btn-warning'>Edit</button>
          </Link>
          <button className='btn btn-danger' onClick={cancelRes}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationView;
