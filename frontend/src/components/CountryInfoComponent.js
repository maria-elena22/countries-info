import React from "react";
import LeftColumnComponent from "./LeftColumnComponent";
import RightColumnComponent from "./RightColumnComponent";

function CountryInfoComponent(props) {
  const country = props.country;


  function getOfficialName(common, official) {
    if (common !== official) {
      return <span className="secondName"> ({official})</span>;
    }
  }

  return (
    <div>
      <h2 data-testid="cy-info-name" id={`${country.cca2}`}>
        {country.name.common}
        {getOfficialName(country.name.common, country.name.official)}
      </h2>
      <div className="top-div">
        <LeftColumnComponent country={country}/>

        <RightColumnComponent country={country}/>
      </div>
    </div>
  );
}

export default CountryInfoComponent;
