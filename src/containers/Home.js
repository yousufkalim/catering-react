// Init
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Importing Components
import Header from "../components/Header";
import Listing from "../components/Listing";
import Footer from "../components/Footer";

// Styles
const useStyles = makeStyles({
  container: { position: "relative" },
  header: { position: "absolute", top: 0, zIndex: 1000, width: "100%" },
});

// Home Component
export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div>
        <Listing />
      </div>

      <Footer />
    </div>
  );
}
