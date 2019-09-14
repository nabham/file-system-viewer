import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @description This component handle search functionality
 * 
 */
const SearchView = ({ handleSearch }) => {

  let [searchText, setSearchText] = useState('');

  // Trigger search on Enter key
  function searchKeyPress(event) {
    if (event.key === 'Enter' && searchText) {
      handleSearch(searchText);
      return;
    }
  }

  function handleClear() {
    if (searchText) {
      handleSearch('');
    }
    setSearchText('');
  }

  return (
    <div className="search-bar">
      <input type="text" onKeyPress={searchKeyPress} onChange={(event) => setSearchText(event.target.value)} value={searchText} placeholder="Search for anything" />
      <button onClick={handleClear} className={searchText ? 'visible' : 'invisible'}>x</button>
    </div>
  );
}

SearchView.propTypes = {
  handleSearch: PropTypes.func
};

export default SearchView;