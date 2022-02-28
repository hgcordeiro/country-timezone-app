import { useQuery } from "@apollo/client";
import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

import { TIMEZONE_QUERY } from "../../graphql/queries/TIMEZONE_QUERY.queries";
import { TimeZone } from "../../types/TimeZone";

function TimeZoneList(props: { input: string }) {
  function calculateTime(
    date: Date,
    time: { hours: number; mins: number; secs: number },
  ) {
    const { hours, mins, secs } = time;

    date.setUTCHours(date.getHours() + hours);
    date.setUTCMinutes(date.getMinutes() + mins);
    date.setUTCSeconds(date.getSeconds() + secs);

    return date.toLocaleTimeString();
  }

  const [time, setTime] = useState(new Date(Date.now()));

  useEffect(() => {
    setInterval(() => {
      setTime(new Date(Date.now()));
    }, 1000);
  });

  const { data, loading, error } = useQuery(TIMEZONE_QUERY);
  if (loading) return <ul></ul>;
  if (error) return <ul></ul>;

  const filteredData = data.getTimeZones.filter((timeZone: TimeZone) => {
    if (props.input === "") {
      return timeZone;
    }
    return timeZone.name.toLowerCase().startsWith(props.input);
  });
  return (
    filteredData && (
      <List
        sx={{
          width: "100%",
          maxWidth: 500,
        }}
      >
        {filteredData.slice(0, 3).map((item: TimeZone) => {
          return (
            <ListItem
              alignItems="flex-start"
              key={item.id}
              sx={{
                width: "450px",
                height: "98px",
                marginTop: "4px",
                marginBottom: "20px",
                bgcolor: "#ffffff",
                borderRadius: "5px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
              }}
            >
              <ListItemText
                primary={item.name}
                secondary={item.gmt}
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "15px",
                }}
              />
              <ListItemText
                primary={calculateTime(time, item)}
                sx={{
                  marginTop: "15px",
                  marginRight: "10px",
                  paddingRight: "0",
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              />
            </ListItem>
          );
        })}
      </List>
    )
  );
}

export default TimeZoneList;
