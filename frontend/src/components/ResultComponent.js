// ResultComponent.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountryLineComponent from "./CountryLineComponent";
import CountryInfoComponent from "./CountryInfoComponent";
import { nanoid } from "nanoid";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingComponent from "./LoadingComponent";
import "@fortawesome/fontawesome-free/css/all.css";
import {getCountryByName } from "../service/CountryService";


function ResultComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const countryName = queryParams.get("country");

  function handleNewSearch(e) {
    e.preventDefault();
    navigate("/");
  }
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subError, setSubError] = useState(null);
  const [countryChosen, setCountryChosen] = useState(null);

  
useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await getCountryByName(countryName);
      setData(result);
      setCountryChosen(result[0]);
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setError("We are experiencing some Server Issues");
        setSubError("Please try again later");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [countryName]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <div className="middle-container">
        <div data-testid="cy-error-text" className="middle-text">{error}</div>
        <div className="middle-text">{subError}</div>
        <button data-testid="cy-error-search"
          className="newSearch btn btn-outline-dark"
          onClick={handleNewSearch}
        >
          New Search <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    );
  }

  const countryList = data.map((country) => (
    <CountryLineComponent
      key={nanoid()}
      country={country}
      countryChosen={countryChosen}
      setCountryChosen={setCountryChosen}
    />
  ));

  return (
    <div>
      <header className="header">
        <button data-testid="cy-result-search"
          className="newSearchList btn btn-outline-dark"
          onClick={handleNewSearch}
        >
          New Search
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </header>
      <div className="scroll" style={{ display: "flex" }}>
        <div
          className="list-group"
          style={{ flex: "0 0 20%", overflowY: "auto" }}
        >
          {countryList}
        </div>
        <div
          data-offset="0"
          style={{
            flex: "1",
            overflowY: "auto",
            padding: "20px",
            paddingBottom: "0",
            paddingTop: "0",
          }}
        >
          <CountryInfoComponent key={nanoid()} country={countryChosen} />
        </div>
      </div>
    </div>
  );
}

export default ResultComponent;
