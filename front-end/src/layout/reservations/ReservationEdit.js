import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readReservation, updateReservation } from '../../utils/api';
import ErrorAlert from '../ErrorAlert';
import './ReservationEdit.css';

const ReservationEdit = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: 1,
  });
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    setError(null);
    readReservation(reservation_id).then(setFormData).catch(setError);
  }

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.name === 'people' ? Number(target.value) : target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReservation(formData)
      .then(() => history.goBack())
      .catch(setError);
  };

  const cancelHandler = () => history.goBack();

  return (
    <div className='reservationEdit'>
      <div className='reservationEdit__container'>
        <h1>Edit Reservation</h1>
        <ErrorAlert error={error} />
        <form className='reservationEdit__form' onSubmit={handleSubmit}>
          <div className='reservationEdit__formGroup'>
            <label htmlFor='first_name'>First Name</label>
            <input
              type='text'
              name='first_name'
              placeholder='First Name'
              required
              value={formData.first_name}
              onChange={changeHandler}
            />
          </div>
          <div className='reservationEdit__formGroup'>
            <label htmlFor='last_name'>Last Name</label>
            <input
              type='text'
              name='last_name'
              placeholder='Last Name'
              required
              value={formData.last_name}
              onChange={changeHandler}
            />
          </div>
          <div className='reservationEdit__formGroup'>
            <label htmlFor='mobile_number'>Mobile Number</label>
            <input
              type='tel'
              name='mobile_number'
              placeholder='000-000-0000'
              maxLength='12'
              minLength='7'
              required
              value={formData.mobile_number}
              onChange={changeHandler}
            />
          </div>
          <div className='reservationEdit__formGroup'>
            <label htmlFor='reservation_date'>Reservation Date</label>
            <input
              type='date'
              name='reservation_date'
              required
              value={formData.reservation_date}
              onChange={changeHandler}
            />
          </div>
          <div className='reservationEdit__formGroup'>
            <label htmlFor='reservation_time'>Reservation Time</label>
            <input
              type='time'
              name='reservation_time'
              required
              value={formData.reservation_time}
              onChange={changeHandler}
            />
          </div>
          <div className='reservationEdit__formGroup'>
            <label htmlFor='people'>People</label>
            <input
              type='number'
              name='people'
              min='1'
              placeholder='Number of People'
              required
              value={formData.people}
              onChange={changeHandler}
            />
          </div>
          <div className='reservationEdit__formBtns'>
            <button
              onClick={cancelHandler}
              className='reservationEdit__formBtn'
            >
              Cancel
            </button>
            <button className='reservationEdit__formBtn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationEdit;
