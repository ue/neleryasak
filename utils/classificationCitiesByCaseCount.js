import { formatNumbers } from "./FormatNumbers";

const classificationCitiesByCaseCount = (findCity, geometry, riskStatus) => {
  let resultObject = {};

  const caseCountDaily = Math.round(
    ((findCity.population / 100000) * findCity.caseRatio) / 7
  );
  const caseCountWeekly = Math.round(
    (findCity.population / 100000) * findCity.caseRatio
  );

  resultObject[geometry.id] = {
    fillKey: riskStatus,
    caseCount: formatNumbers(caseCountDaily),
    caseCountWeekly: formatNumbers(caseCountWeekly),
    caseRatio: findCity.caseRatio,
    name: geometry.properties.name,
  };
  return resultObject;
};

export default classificationCitiesByCaseCount;