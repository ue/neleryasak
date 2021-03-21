import { useState, useEffect } from "react";
import Datamap from "datamaps";
import { geoPath, geoMercator } from "d3-geo";
import { getTurkeyTopology } from "../api/getTurkeyTopology";
import { getCaseRatio } from "../api/getCaseRatio";
import classificationCitiesByCaseCount from "../utils/classificationCitiesByCaseCount";
import cityPopulation from "../constants/CityPopulation";
import caseBorders from "../constants/caseBorders";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const cityStatuses = {
  "Çok Yüksek Risk": 5,
  "Yüksek Risk": 4,
  "Orta Risk": 3,
  "Düşük Risk": 2,
};

const TurkeyMap = ({ getCityName, getAllCities }) => {
  const [mapData, setMapData] = useState({});
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const topographyURL =
    "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/438b8a8d419a5059c07ea5115aa65ca7b3f294cd/turkey.topo.json";

  const override = css`
    display: block;
    margin-top: 2rem;
    border-color: #0070f3;
  `;

  const mapConfig = (element) => {
    return {
      scope: "collection",
      height: 600,
      responsive: window.innerWidth < 900 ? true : false,
      element: element,
      setProjection: function (element) {
        const projection = geoMercator()
          .center([35.6667, 39.1667]) // turkey coordinates [East Latitude, North Longitude]
          .scale(window.innerWidth * 1.8)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        const path = geoPath().projection(projection);
        return { path: path, projection: projection };
      },
      done: function (datamap) {
        datamap.svg
          .selectAll(".datamaps-subunit")
          .on("click", function (geography) {
            let newCity = {};
            const { id, properties } = geography;
            const { name } = properties;
            newCity.id = id;
            newCity.name = name;
            const selectedCity = mapData[id];
            newCity.riskValue = cityStatuses[selectedCity.fillKey];
            getCityName(newCity);
          });
        let selectedCity = {};
        const findCity = datamap.svg
          .selectAll(".datamaps-subunit")[0]
          .find(
            (city) =>
              JSON.parse(city.getAttribute("data-info")).name === "İstanbul"
          );
        selectedCity.riskValue =
          cityStatuses[JSON.parse(findCity.getAttribute("data-info")).fillKey];
        getAllCities({
          ...selectedCity,
          ...JSON.parse(findCity.getAttribute("data-info")),
        });
      },
      geographyConfig: {
        dataUrl: topographyURL,
        highlightBorderColor: "#000",
        borderColor: "#565252",
        highlightFillColor: "#1B888C",
        popupTemplate: function (geography, data) {
          return `<div class="hoverinfo" style="padding: 10px; border-radius: 2px; font-family: nunito;">
                  <div style='text-align:center; font-weight: 600; color:#1B888C; font-size: 18px'>${data.name}</div>
                  <div><strong>Ort. Günlük Vaka Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseCount}</span></div>
                  <div><strong>Haftalık Vaka Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseCountWeekly}</span></div>
                  <div><strong>Haftalık Vaka Oranı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseRatio}</span></div>
                </div>`;
        },
        highlightBorderWidth: 3,
      },
      fills: {
        "Çok Yüksek Risk": "#CE0404",
        "Yüksek Risk": "#F08F00",
        "Orta Risk": "#FEFD05",
        "Düşük Risk": "#13B3C5",
        defaultFill: "#EDDC4E",
      },
    };
  };

  useEffect(() => {
    handleCaseRatios("https://covid-turkey-case-ratio.herokuapp.com/");
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      let lastMapData = {};

      getTurkeyTopology(topographyURL).then((res) => {
        res.objects.collection.geometries.forEach((geometry) => {
          const findCity = cities.find(
            (city) =>
              city.name.toLowerCase() === geometry.properties.name.toLowerCase()
          );
          if (findCity) {
            let resultObject = {};
            if (findCity.caseRatio <= caseBorders.low.riskBorder) {
              resultObject = classificationCitiesByCaseCount(
                findCity,
                geometry,
                "Düşük Risk"
              );
            } else if (
              findCity.caseRatio > caseBorders.medium.minRiskBorder &&
              findCity.caseRatio <= caseBorders.medium.maxRiskBorder
            ) {
              resultObject = classificationCitiesByCaseCount(
                findCity,
                geometry,
                "Orta Risk"
              );
            } else if (
              findCity.caseRatio > caseBorders.bad.minRiskBorder &&
              findCity.caseRatio < caseBorders.bad.maxRiskBorder
            ) {
              resultObject = classificationCitiesByCaseCount(
                findCity,
                geometry,
                "Yüksek Risk"
              );
            } else {
              resultObject = classificationCitiesByCaseCount(
                findCity,
                geometry,
                "Çok Yüksek Risk"
              );
            }
            lastMapData = { ...lastMapData, ...resultObject };
          }
        });
        setMapData(lastMapData);
      });
    }
  }, [cities]);

  useEffect(() => {
    createMap();
  }, [mapData]);

  const handleCaseRatios = (url) => {
    setLoading(true);
    getCaseRatio(url)
      .then((data) => {
        if (data.cities.length > 0) {
          const result = cityPopulation.map((cityCaseRatio) => {
            const findCity = data.cities.find(
              (cityCovid) =>
                cityCovid.name.toLocaleLowerCase() ===
                cityCaseRatio.name.toLocaleLowerCase()
            );
            if (findCity) {
              cityCaseRatio["caseRatio"] = findCity.caseRatio;
              return cityCaseRatio;
            }
          });
          setCities(result);
        }
      })
      .catch((err) => {
        console.log("err :>> ", err);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const createMap = () => {
    if (mapData !== undefined && Object.keys(mapData).length > 0) {
      new Datamap({
        ...mapConfig(document.getElementById("mapWrapper")),
        data: mapData,
      });
    }
  };

  return (
    <>
      {loading ? (
        <ClipLoader loading={loading} size={50} css={override} />
      ) : (
        <div id="mapWrapper" style={{ width: "100%" }} />
      )}
    </>
  );
};

export default TurkeyMap;
