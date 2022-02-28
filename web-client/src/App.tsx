import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import TimeZoneList from "./components/TimeZoneList";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

function App() {
  const [inputText, setInputText] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <div className="search">
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "450px",
            height: "60px",
            background: "#f7f7f7",
            transition: "boxShadow 1s",
            "&:hover, &:checked": {
              boxShadow: "0px 3px 11px rgba(0, 0, 0, 0.25);",
            },

            borderRadius: "3px",

            marginTop: "25px",
          }}
        >
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{
              width: "450px",
            }}
            placeholder="Search"
            onChange={inputHandler}
          />
        </Paper>
      </div>
      <TimeZoneList input={inputText} />
    </div>
  );
}

export default App;
