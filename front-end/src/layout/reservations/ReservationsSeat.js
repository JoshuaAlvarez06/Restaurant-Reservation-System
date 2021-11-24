import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listTables, seatReservation } from '../../utils/api';
import ErrorAlert from '../ErrorAlert';

const ReservationsSeat = () => {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(0);
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();
  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables().then(setTables).catch(setError);
    return () => abortController.abort();
  }
  const cancelHandler = () => history.goBack();
  const changeHandler = ({ target }) => {
    setTableId(Number(target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tableId === 0) {
      return setError({ message: 'Select a table from the list' });
    }
    seatReservation(tableId, reservation_id)
      .then(() => history.push('/dashboard'))
      .catch(setError);
  };

  return (
    <div className='tablesNew'>
      <div className='tablesNew__container'>
        <h1>Seat Reservation</h1>
        <ErrorAlert error={error} />
        <form className='tablesNew__form' onSubmit={handleSubmit}>
          <div className='tablesNew_formGroup'>
            <label htmlFor='table_name'>Table Number</label>
            <select
              name='table_id'
              minLength='2'
              onChange={changeHandler}
              required
            >
              <option value=''>Select a Table</option>
              {tables.map((table) => (
                <option
                  key={table.table_id}
                  value={table.table_id}
                  disabled={table.reservation_id ? true : false}
                >
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div className='tablesNew_formBtns'>
            <button
              className='tablesNew__formBtn'
              onClick={cancelHandler}
              type='button'
            >
              Cancel
            </button>
            <button className='tablesNew__formBtn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationsSeat;
