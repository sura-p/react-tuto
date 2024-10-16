import React from "react";

const SearchBox = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    const { value } = event.target;
    onSearch(value); // Call the callback function with the current input value
  };

  return (
    <div className="row searchBox">
      <div className="col-sm-12 searchBox-inner">
        <div className="form-group has-feedback">
          <input
            id="searchText"
            type="text"
            className="form-control"
            name="searchText"
            placeholder="Search"
            onChange={handleSearchChange} // Handle the input change
          />
          <span className="glyphicon glyphicon-search form-control-feedback"></span>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
