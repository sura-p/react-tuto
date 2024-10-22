import React from 'react'

function ComposeBox({searchTerm}) {

  const handleSearchChange = (event) => {
    const { value } = event.target;
    searchTerm(value); 
  };
  return (
    <div class="row composeBox">
            <div class="col-sm-12 composeBox-inner">
              <div class="form-group has-feedback">
                <input id="composeText" type="text" class="form-control" name="searchText" placeholder="Search to People" onChange={handleSearchChange}/>
                <span class="glyphicon glyphicon-search form-control-feedback"></span>
              </div>
            </div>
          </div>
  )
}

export default ComposeBox