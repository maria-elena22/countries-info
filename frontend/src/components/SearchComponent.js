import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchComponent(){
  const [searchData, setFormData] = useState({ inputValue: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  function handleInputChange(e){

    const newValue = e.target.value.trim();

    if(newValue.length > 0 ){
        setIsButtonDisabled(false);
    }
    if(newValue.length === 0 ){
      setIsButtonDisabled(true);
  }
    setFormData({ inputValue: newValue});
    
  };

  function handleFormSubmit(e){
    e.preventDefault();
    const countryName = searchData.inputValue;
    navigate(`/results?country=${countryName}`);

    
  };

  return (
    <div className='search-container'>
        
    <div className='search'>
        <h1 data-testid="cy-app-title" className='title'>Country Info Lookup</h1>
        <form data-testid="cy-search-form" className=""onSubmit={handleFormSubmit}>
            <label className="form-label" htmlFor="form1">Enter a Country:</label>
            <div className='input-group'>
                <input data-testid="cy-search-input" className="form-control mr-sm-2" type="text" value={searchData.inputValue} onChange={handleInputChange} aria-label="Search"></input>
                <button data-testid="cy-search-button" className="btn btn-outline-dark" disabled={isButtonDisabled} type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
        </form>
    </div>
    </div>
  );
  
  
};

export default SearchComponent;
