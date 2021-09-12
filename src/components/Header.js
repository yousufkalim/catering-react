// Init
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Store, UpdateStore } from "../StoreContext";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";

// Styles
const useStyles = makeStyles({
  appBar: {
    color: "white",
    backgroundColor: "transparent",
    boxShadow: "none",
    width: "100%",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    flexGrow: 1,
    fontFamily: "TektonPro",
    fontSize: "28px",
  },
  link: {
    textDecoration: "none",
  },
  register: {
    fontFamily: "Roboto",
    fontSize: "18px",
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
    paddingRight: "25px",
  },
  navLinks: { marginLeft: "auto" },
  menuLinks: { textDecoration: "none", color: "black" },
});

// Component
const Header = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { user } = Store();
  const updateStore = UpdateStore();
  const userExists = Object.keys(user).length > 0 ? true : false;

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateStore({ user: {} });
    window.location = "/";
  };

  const [menu, setMenu] = useState(null);

  const handleClick = (event) => setMenu(event.currentTarget);
  const handleClose = () => setMenu(null);

  return (
    <AppBar
      position="static"
      className={classes.appBar}
      style={pathname === "/register" ? { color: "black" } : {}}
    >
      <Toolbar className={classes.toolBar}>
        <div>
          <Link to="/" className={classes.link}>
            <Typography
              variant="h6"
              className={classes.title}
              style={
                pathname !== "/register" &&
                pathname !== "/login" &&
                pathname !== "/profile"
                  ? { color: "white" }
                  : { color: "#303f9f" }
              }
            >
              H-CATERING
            </Typography>
          </Link>
        </div>

        <Hidden smDown>
          <div className={classes.navlinks}>
            {!userExists && pathname === "/" && (
              <Link to="/login" className={classes.register}>
                Login
              </Link>
            )}
            {!userExists && pathname === "/" && (
              <Link to="/register" className={classes.register}>
                Vendors Registration
              </Link>
            )}
            {userExists && pathname !== "/profile" && (
              <Link to="/profile" className={classes.register}>
                Profile
              </Link>
            )}
            {userExists && (
              <Link to={`/vendor/${user._id}`} className={classes.register}>
                Details
              </Link>
            )}
            {userExists && (
              <Typography
                variant="caption1"
                className={classes.register}
                style={pathname === "/profile" ? { color: "black" } : {}}
                onClick={handleLogout}
              >
                Logout
              </Typography>
            )}
          </div>
        </Hidden>
        <Hidden mdUp>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon style={{ color: "white" }} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={menu}
              keepMounted
              open={Boolean(menu)}
              onClose={handleClose}
            >
              {!userExists && pathname === "/" && (
                <Link to="/login" className={classes.menuLinks}>
                  <MenuItem>Login</MenuItem>
                </Link>
              )}
              {!userExists && pathname === "/" && (
                <Link to="/register" className={classes.menuLinks}>
                  <MenuItem>Vendors Registration</MenuItem>
                </Link>
              )}
              {userExists && pathname !== "/profile" && (
                <Link to="/profile" className={classes.menuLinks}>
                  <MenuItem>Profile</MenuItem>
                </Link>
              )}
              {userExists && (
                <Link to={`/vendor/${user._id}`} className={classes.menuLinks}>
                  <MenuItem>Details</MenuItem>
                </Link>
              )}
              {userExists && (
                <MenuItem>
                  <Typography
                    variant="caption1"
                    className={classes.menuLinks}
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
