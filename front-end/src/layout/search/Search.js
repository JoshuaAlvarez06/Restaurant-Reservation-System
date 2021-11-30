import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { searchReservations } from '../../utils/api';
import ErrorAlert from '../ErrorAlert';
import './Search.css';
import SearchResult from './SearchResult';

const Search = () => {
  const history = useHistory();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [display, setDisplay] = useState(false);

  const changeHandler = ({ target }) => {
    setMobileNumber(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchReservations(mobileNumber)
      .then(setResults)
      .then(() => setDisplay(true))
      .catch(setError);
  };

  const cancelHandler = () => history.goBack();

  const searchResults = results?.length ? (
    <div className='search__results'>
      {results.map((reservation) => (
        <SearchResult reservation={reservation} />
      ))}
    </div>
  ) : (
    <p className='search_resultsNotFound'>{`No reservations found for ${mobileNumber}`}</p>
  );

  return (
    <div className='search'>
      <div className='search__container'>
        <h1>Search for Reservation</h1>
        <ErrorAlert error={error} />
        <form className='search__form' onSubmit={handleSubmit}>
          <div className='search__formGroup'>
            <label htmlFor='mobile_number'>Mobile Number</label>
            <input
              type='text'
              name='mobile_number'
              placeholder="Enter a customer's phone number"
              value={mobileNumber}
              onChange={changeHandler}
            />
          </div>
          <div className='search__formBtns'>
            <button
              className='search__formBtn'
              onClick={cancelHandler}
              type='button'
            >
              Cancel
            </button>
            <button className='search__formBtn' type='submit'>
              Find
            </button>
          </div>
        </form>
        {display && searchResults}
      </div>
    </div>
  );
};

export default Search;
