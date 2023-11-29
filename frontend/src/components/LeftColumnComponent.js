import React from "react";
import { nanoid } from "nanoid";
import "bootstrap/dist/css/bootstrap.min.css";
import Utils from "../utils/Utils";
import InfoComponent from "./InfoComponent";
import InfoCardsComponent from "./InfoCardsComponent";

function LeftColumnComponent(props) {
    const {
        name,
        languages,
        timezones,
        currencies,
        landlocked,
        independent,
        unMember,
        tld,
        car,
        startOfWeek,
    } = props.country;

    function getNamesTable() {
        if (languages !== undefined) {
        const allLanguages = Object.keys(languages);
        const languagesFiltered = allLanguages.filter((language) =>
            Object.keys(name.nativeName).includes(language)
        );

        const nativeNames = languagesFiltered.map((language) => (
            <tr  key={nanoid()}>
            <td>{languages[language]}</td>
            <td>{name.nativeName[language].official}</td>
            <td>{name.nativeName[language].common}</td>
            </tr>
        ));
        if (languagesFiltered.length > 0) {
            return (
            <div className="table-responsive">
                <table data-testid="cy-left-namesTable" className="table namesTable">
                <thead>
                    <tr>
                    <th scope="col">Language</th>
                    <th scope="col">Official Name</th>
                    <th scope="col">Common Name</th>
                    </tr>
                </thead>
                <tbody>{nativeNames}</tbody>
                </table>
            </div>
            );
        }
        }
    }

    function getLeftSections() {
        const cards = [
        { title: "Language", info: languages && getLanguagesNames() },
        { title: "Currency", info: currencies && getCurrencies() },
        { title: "Landlocked", info: landlocked !== undefined && getAnswer(landlocked) },
        { title: "Independent", info: independent !== undefined && getAnswer(independent) },
        { title: "UN Member", info: unMember !== undefined && getAnswer(unMember) },
        { title: "Internet TLD", info: tld },
        { title: "Driving Side", info: car && car.side !== undefined && Utils.capitalizeFirstLetter(car.side) },
        { title: "Start of Week", info: startOfWeek && Utils.capitalizeFirstLetter(startOfWeek) },
        { title: "Timezone", info: timezones && getTimezones() },
        ].filter((card) => card.info !== undefined);

        return <InfoCardsComponent cards={cards} />;
    }

    function getLanguagesNames() {
        const languageComponents = languages && Object.values(languages).map((language) =>
          getComponent(language)
        );
    
        return <div className="components">{languageComponents}</div>;
    }
    
      function getTimezones() {
        const timezoneComponents = timezones && timezones.map((timezone) =>
          getComponent(timezone)
        );
    
        return <div className="components">{timezoneComponents}</div>;
    }

    function getCurrencies() {
        const currencyList = currencies && Object.keys(currencies).map((currency) => {
          const { name, symbol } = currencies[currency];
          const currencyString = symbol ? `${name} (${symbol})` : `${name}`;
          return getComponent(currencyString);
        });
    
        return currencyList;
    }
    
    function getAnswer(bool) {
        return bool ? (
          <i className="fa fa-check" style={{ color: "green" }} aria-hidden="true"></i>
        ) : (
          <i className="fa fa-times" style={{ color: "red" }} aria-hidden="true"></i>
        );
    }

    function getComponent(info) {
        return <InfoComponent info={info} key={nanoid()} />;
    }

    return (
        <div className="leftColumn">
        {getNamesTable()}
        <div>{getLeftSections()}</div>
        </div>
    );
}

export default LeftColumnComponent;
