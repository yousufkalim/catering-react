// Init
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "../components/slider";

// Importing Components
import Header from "../components/Header";

// styles
const useStyles = makeStyles({
  container: { position: "relative" },
  header: { position: "absolute", top: 0, zIndex: 1000 },
  slider: { height: "200px", overflow: "hidden" },
});

// Home Component
export default function Details() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.slider}>
        <Slider />
      </div>
    </div>
  );
}
