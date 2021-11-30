import React from 'react';
import ReservationForm from './ReservationForm';
import './ReservationsNew.css';
import { createReservation } from '../../utils/api';

const ReservationsNew = () => {
  const initialFormData = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: 1,
  };

  return (
    <>
      <ReservationForm
        onSubmit={createReservation}
        initialFormState={initialFormData}
      />
    </>
  );
};

export default ReservationsNew;
