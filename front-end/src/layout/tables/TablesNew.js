import React, { useState } from 'react';
import './TablesNew.css';
import ErrorAlert from '../ErrorAlert';
import { useHistory } from 'react-router-dom';
import { createTable } from '../../utils/api';

const TablesNew = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    table_name: '',
    capacity: 0,
  });
  const history = useHistory();

  const cancelHandler = () => history.goBack();

  const changeHandler = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.name === 'capacity' ? Number(target.value) : target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      createTable(
        {
          data: { ...formData },
        },
        abortController.signal
      )
        .then(() => history.push('/dashboard'))
        .catch(setError);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='tablesNew'>
      <div className='tablesNew__container'>
        <h1>New Table</h1>
        <ErrorAlert error={error} />
        <form className='tablesNew__form' onSubmit={handleSubmit}>
          <div className='tablesNew_formGroup'>
            <label htmlFor='table_name'>Table Name</label>
            <input
              type='text'
              name='table_name'
              minLength='2'
              value={formData.table_name}
              onChange={changeHandler}
              required
            />
          </div>
          <div className='tablesNew_formGroup'>
            <label htmlFor='capacity'>Capacity</label>
            <input
              type='text'
              name='capacity'
              value={formData.capacity}
              min='1'
              onChange={changeHandler}
              required
            />
          </div>
          <div className='tablesNew_formBtns'>
            <button className='tablesNew__formBtn' onClick={cancelHandler}>
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

export default TablesNew;
