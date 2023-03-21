import { makeStyles } from "@mui/styles";
import React from "react";

export default function Header() {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1>My Meetings</h1>
    </header>
  );
}

const useStyles = makeStyles({
  header: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "pink"
  },
});
