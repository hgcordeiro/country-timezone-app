import fs from "fs";

import parser from "xml2json";

const WATCH_TARGET = "src/xml/timezones.xml";

fs.watch(WATCH_TARGET, (_eventType, _filename) => {
  const xmlData = fs.readFileSync(WATCH_TARGET);

  const jsonData = parser.toJson(xmlData);

  return JSON.parse(jsonData).TimeZones.TimeZone;
});

export const xmlData = () => {
  const xmlData = fs.readFileSync("src/xml/timezones.xml");

  const jsonData = parser.toJson(xmlData);

  return JSON.parse(jsonData).TimeZones.TimeZone;
};
