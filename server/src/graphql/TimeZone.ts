import { extendType, objectType } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";
import slugify from "slugify";
import { xmlData } from "../xmlParser";

export const TimeZone = objectType({
  name: "TimeZone",
  definition(t) {
    t.nonNull.string("id", { description: "Time zone Id" });
    t.nonNull.string("name", { description: "Time zone Name" });
    t.nonNull.string("gmt", { description: "Greenwich Mean Time (GMT)" });
    t.nonNull.int("hours", { description: "Time zone hours" });
    t.nonNull.int("mins", { description: "Time zone minutes" });
    t.nonNull.int("secs", { description: "Time zone seconds" });
  },
});

export const TimeZoneQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getTimeZones", {
      type: "TimeZone",
      resolve(_parent, _args, _context, _info) {
        const timeZonesFromXML = xmlData();

        const timeZones: NexusGenObjects["TimeZone"][] = [];

        timeZonesFromXML.map((t: { Id: any; Name: any; Hours: any; Mins: any; Secs: any }) => {
          const { Id, Name, Hours, Mins, Secs } = t;

          const commaSeparatedCountries = Name.split(" UTC")[0];
          let gmt = "";

          if (Hours > 0) {
            gmt = `GMT+${Hours}`;
          } else {
            gmt = `GMT${Hours}`;
          }

          if (Mins > 0) {
            gmt += `:${Mins}`;
          }

          const countries: string[] = commaSeparatedCountries.split(",");

          const options = {
            lower: true, // convert to lower case
            strict: false, // strip special characters
          };

          countries.map(country => {
            const id = slugify(`${country.trim()} ${Id}`, options);

            timeZones.push({
              id,
              gmt,
              name: country.trim(),
              hours: Hours,
              mins: Mins,
              secs: Secs,
            });
          });
        });

        const sortedTimeZones = timeZones.sort(function (a, b) {
          const textA = a.name.toUpperCase();
          const textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        return sortedTimeZones;
      },
    });
  },
});
