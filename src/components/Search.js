import React, { useState } from 'react';
import { connect } from 'react-redux'
import { searchRestaurantsAsync, updateRestaurantsAsync, updateFilter } from '../actions/actionCreators.js';
import exit from '../assets/images/exit.svg';
import arrowRight from '../assets/images/arrowRight.svg';
import '../styles/Search.scss';

export const Search = ({ searchRestaurantsAsync, updateRestaurantsAsync, updateFilter, filter }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => { 
    e.preventDefault();
    searchInput ? searchRestaurantsAsync(searchInput) : updateRestaurantsAsync();
  }
  const handleClearSearch = (e) => {
    e.preventDefault();
    updateRestaurantsAsync();
    updateFilter("");
    setSearchInput("");
  }

  return (
    <form className="search">
      <input 
        type="text" 
        className="search__input" 
        aria-label="Search for a nearby restaurant"
        placeholder="Search for a nearby restaurant:"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      /> 

      { searchInput && filter === searchInput ?
        <button className="search__button" onClick={handleClearSearch} aria-label="Clear Search">
          <img src={exit} alt="An exit icon" />
        </button>
      : 
        <button className="search__button" onClick={handleSubmit} aria-label="Search">
          <img src={arrowRight} alt="An arrow pointing right" />
        </button>
      }
    </form>
  )
}

const mapStateToProps = ({ filter }) => ({ filter });
export default connect(mapStateToProps, { searchRestaurantsAsync, updateRestaurantsAsync, updateFilter })(Search);