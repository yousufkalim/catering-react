// Init
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// Styles
const useStyles = makeStyles({
  appBar: {
    color: "white",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  menuButton: { marginRight: "auto" },
  title: {
    flexGrow: 1,
    fontFamily: "TektonPro",
    fontSize: "28px",
  },
  register: {
    fontFamily: "Roboto",
    fontSize: "18px",
    textDecoration: "none",
    color: "black",
  },
});

// Component
const Header = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <AppBar
      position="static"
      className={classes.appBar}
      style={pathname === "/register" ? { color: "black" } : {}}
    >
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          H-CATERING
        </Typography>
        {pathname === "/" && (
          <Link to="register" className={classes.register}>
            Vendors Registration
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
