import React from "react";
import InfoComponent from "./InfoComponent";
import MapComponent from "./MapComponent";
import { nanoid } from "nanoid";
import "bootstrap/dist/css/bootstrap.min.css";
import Utils from "../utils/Utils";


function RightColumnComponent(props) {

    const {
        name,
        capital,
        cca2,
        region,
        subregion,
        area,
        population,
        coatOfArms,
        flags,
        capitalInfo,
        latlng,
        maps,
    } = props.country;


    const coordinates = capitalInfo?.latlng || latlng;

    

    const getPropertyRow = (label, value) => {

        
        return value !== undefined ? (
          <tr key={label}>
            <th scope="row">{label}:</th>
            <td>{value}</td>
          </tr>
        ) : null;
      };

    

    function getRightSections(){
        const isoCodeComp = getPropertyRow("ISO 3166 Code", [cca2]);
        const regionComp = getPropertyRow("Region", [`${region} ${getSubregion()}`]);
        const areaComp = getPropertyRow("Area", [Utils.formatNumber(area) + " km²"]);
        const populationComp = getPropertyRow("Population", [Utils.formatNumber(population)]);
        const capitalComp = Array.isArray(capital) && capital.length > 0 ? (
            <tr key="capital">
            <th scope="row">Capital:</th>
            <td>{capital.map((c) => getComponent(c))}</td>
            </tr>
        ) : null;

        

        return [capitalComp,regionComp,isoCodeComp,areaComp,populationComp]
    }

    
    function getSubregion() {
      return subregion !== undefined ? `(${subregion})` : "";
    }
  
    function getComponent(info) {
      return <InfoComponent info={info} key={nanoid()} />;
    }


    function getSymbolFigure(imageSrc, imageId, altText, caption) {
        return Object.keys(imageSrc).length > 0 ? (
        <figure className={"figure img-thumbnail"}>
            <img
            data-testid={"cy-right-" + imageId}
            src={imageSrc.png}
            id={imageId}
            className="figure-img img-fluid rounded"
            alt={altText}
            />
            <figcaption className="figure-caption text-center">{caption}</figcaption>
        </figure>
        ) : null;
    }


  return (
    <div className="rightColumn">
      <div data-testid="cy-right-symbols" className="symbols">
        {getSymbolFigure(flags, "flag", flags.alt,"Flag")}
        {getSymbolFigure(coatOfArms, "coatOfArms", `${name.common}'s Coat of Arms`, "Coat of Arms")}
      
      </div>
      <div data-testid="cy-right-map" className="map img-thumbnail">
        <MapComponent coords={coordinates} url={maps.googleMaps} />
      </div>

      <table className="infoTable">
        <tbody>
          <tr>
            <th scope="row">Coordinates:</th>
            <td>{Utils.convertCoordinates(coordinates[0], coordinates[1])}</td>
          </tr>
          {getRightSections()}
        </tbody>
      </table>
    </div>
  );
}

export default RightColumnComponent;
