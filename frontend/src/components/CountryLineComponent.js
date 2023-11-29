import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CountryLineComponent(props) {
  const country = props.country;
  const countryActive =
    props.countryChosen.cca2 === country.cca2 ? "active" : "";

  function handleClick(e) {
    props.setCountryChosen(country);
  }

  return (
    <a
      className={`list-group-item list-group-item-action list-group-item-primary ${countryActive}`}
      href={`#${country.cca2}`}
      onClick={handleClick}
      data-testid="cy-countryLine-name"
    >
      {country.flag}
      {"  "}
      {country.name.common}
    </a>
  );
}
