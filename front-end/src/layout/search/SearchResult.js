import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { updateStatus } from '../../utils/api';

const SearchResult = ({ reservation, setError }) => {
  const history = useHistory();
  const cancelReservation = ({ target }) => {
    const reservation_id = target.dataset.reservationIdCancel;
    const cancelConfirm = window.confirm(
      'Do you want to cancel this reservation? This cannot be undone.'
    );
    if (cancelConfirm) {
      updateStatus(reservation_id, { status: 'cancelled' })
        .then(() => history.go(0))
        .catch(setError);
    }
  };

  return (
    <div className='search__result' key={reservation.reservation_id}>
      <div className='search__resultInfo'>
        <p className='search__resultName'>
          Name: {reservation.first_name} {reservation.last_name}
        </p>
        <p className='search__resultDate'>
          Date: {reservation.reservation_date.slice(0, 10)}
        </p>
        <p className='search__resultTime'>
          Time: {reservation.reservation_time}
        </p>
        <p className='search__resultPeople'>Size: {reservation.people}</p>
        <p className='search__resultStatus'>
          Status:{' '}
          <span
            style={
              reservation.status === 'finished'
                ? { color: 'red', textTransform: 'capitalize' }
                : reservation.status === 'booked'
                ? { color: 'green', textTransform: 'capitalize' }
                : { color: '#333', textTransform: 'capitalize' }
            }
          >
            {reservation.status}
          </span>
        </p>
        <div className='search__resultBtns'>
          <button
            onClick={cancelReservation}
            data-reservation-id-cancel={reservation.reservation_id}
            className={
              reservation.status === 'finished' ||
              reservation.status === 'cancelled'
                ? 'search__resultBtn disabledBtn'
                : 'search__resultBtn btn-danger'
            }
            disabled={
              reservation.status === 'finished' ||
              reservation.status === 'cancelled'
                ? true
                : false
            }
          >
            Cancel
          </button>
          <Link to={`/reservations/${reservation.reservation_id}/edit`}>
            <button
              className={
                reservation.status === 'finished' ||
                reservation.status === 'cancelled'
                  ? 'search__resultBtn disabledBtn'
                  : 'search__resultBtn btn-warning'
              }
              disabled={
                reservation.status === 'finished' ||
                reservation.status === 'cancelled'
                  ? true
                  : false
              }
            >
              Edit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
