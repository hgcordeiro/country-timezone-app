import { gql } from "@apollo/client";

export const TIMEZONE_QUERY = gql`
  query {
    getTimeZones {
      id
      name
      gmt
      hours
      mins
      secs
    }
  }
`;
