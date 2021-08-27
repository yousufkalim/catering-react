// Init
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Importing Components
import Header from "../components/Header";
import Slider from "../components/Slider";
import Profile from "../components/Profile";
import Footer from "../components/Footer";

// styles
const useStyles = makeStyles({
  container: { position: "relative" },
  header: { position: "absolute", top: 0, zIndex: 1000 },
  slider: {
    height: "400px",
    overflow: "hidden",
  },
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
      <Profile />
      <Footer />
    </div>
  );
}
