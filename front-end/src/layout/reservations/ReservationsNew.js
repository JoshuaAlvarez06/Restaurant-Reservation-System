import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import "./ReservationsNew.css";
import { createReservation } from "../../utils/api";

const ReservationsNew = () => {
  const history = useHistory();
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const cancelHandler = () => history.goBack();

  const changeHandler = async ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(typeof formData.people);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReservation({
      data: { ...formData, people: Number(formData.people) },
    })
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setError);
  };

  return (
    <div className="reservationsNew">
      <div className="reservationsNew__container">
        <h1>New Reservation</h1>
        <ErrorAlert error={error} />
        <form className="reservationsNew__form" onSubmit={handleSubmit}>
          <div className="reservationsNew__formGroup">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              required
              value={formData.first_name}
              onChange={changeHandler}
            />
          </div>
          <div className="reservationsNew__formGroup">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              required
              value={formData.last_name}
              onChange={changeHandler}
            />
          </div>
          <div className="reservationsNew__formGroup">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              type="tel"
              name="mobile_number"
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="000-000-0000"
              maxLength="12"
              minLength="7"
              required
              value={formData.mobile_number}
              onChange={changeHandler}
            />
          </div>
          <div className="reservationsNew__formGroup">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              type="date"
              name="reservation_date"
              required
              value={formData.reservation_date}
              onChange={changeHandler}
            />
          </div>
          <div className="reservationsNew__formGroup">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              type="time"
              name="reservation_time"
              required
              value={formData.reservation_time}
              onChange={changeHandler}
            />
          </div>
          <div className="reservationsNew__formGroup">
            <label htmlFor="people">People</label>
            <input
              type="number"
              name="people"
              min="1"
              placeholder="Number of People"
              required
              value={formData.people}
              onChange={changeHandler}
            />
          </div>
          <div className="reservationsNew_formBtns">
            <button
              onClick={cancelHandler}
              className="reservationsNew__formBtn"
            >
              Cancel
            </button>
            <button className="reservationsNew__formBtn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationsNew;
