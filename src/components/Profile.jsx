import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  AddressIcon,
  CashIcon,
  DeliveryIcon,
  MaxPeopleIcon,
  RatingIcon,
  FacebookIcon,
  InstagramIcon,
  WebIcon,
  ColoredAddress,
  ColoredTruck,
  ColoredMaxPeople,
  ColoredCash,
  ColoredRating,
} from "../assets/images";
import Tooltip from "@material-ui/core/Tooltip";
import { Store } from "../StoreContext";

// styles
const useStyles = makeStyles((theme) => ({
  icons: {
    marginTop: "40px",
  },
  iconDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  iconText: { marginTop: "20px" },
  presentation: {
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  heading: { marginBottom: "10px", color: theme.palette.primary.dark },
  text: { marginTop: "20px" },
  hr: {
    backgroundColor: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    width: "200px",
  },
  menu: {
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  website: {
    marginBottom: "80px",
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  btn: {
    marginTop: "20px",
    color: "white",
    maxHeight: "38px",
    borderRadius: "10px",
    backgroundColor: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
    },
  },
  socialLinks: {
    marginRight: "15px",
    marginLeft: "15px",
  },
  tooltip: {
    fontSize: "16px",
    textAlign: "center",
  },
  addressIconDiv: {
    "&:hover": {
      "& img": {
        content: `url(${ColoredAddress})`,
      },
    },
  },
  truckIconDiv: {
    "&:hover": {
      "& img": {
        content: `url(${ColoredTruck})`,
      },
    },
  },
  maxPeopleIconDiv: {
    "&:hover": {
      "& img": {
        content: `url(${ColoredMaxPeople})`,
      },
    },
  },
  priceIconDiv: {
    "&:hover": {
      "& img": {
        content: `url(${ColoredCash})`,
      },
    },
  },
  ratingIconDiv: {
    "&:hover": {
      "& img": {
        content: `url(${ColoredRating})`,
      },
    },
  },
  menu_image: {
    marginTop: "25px",
    borderRadius: "10px",
    maxWidth: "500px",
    cursor: "pointer",
  },
}));

const Profile = ({ vendor, vendorId, handleMenuOpen, handleReviewsOpen }) => {
  const classes = useStyles();
  const { user } = Store();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  return (
    <>
      <Container>
        <Grid container spacing={3} className={classes.icons}>
          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <Tooltip
              title={`${vendor?.address?.label}`}
              placement="top"
              arrow
              classes={{ tooltip: classes.tooltip }}
            >
              <div className={classes.addressIconDiv}>
                <img src={AddressIcon} alt="address" width="65px" />
                <Typography variant="body1" className={classes.iconText}>
                  {vendor?.address?.label.substring(0, 20)}...
                </Typography>
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <div className={classes.truckIconDiv}>
              <img
                src={DeliveryIcon}
                alt="address"
                width="110px"
                style={{ marginTop: "7px" }}
              />
              <Typography variant="body1" className={classes.iconText}>
                {vendor.delivery_radius} Miles
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <div className={classes.maxPeopleIconDiv}>
              <img src={MaxPeopleIcon} alt="address" width="82px" />
              <Typography variant="body1" className={classes.iconText}>
                Max {vendor.max_people_limit} People
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <div className={classes.priceIconDiv}>
              <img src={CashIcon} alt="address" width="79px" />
              <Typography variant="body1" className={classes.iconText}>
                {vendor.price}$
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <div
              className={classes.ratingIconDiv}
              onClick={user?._id !== vendorId ? handleReviewsOpen : () => {}}
              style={user?._id !== vendorId ? { cursor: "pointer" } : {}}
            >
              <img src={RatingIcon} alt="address" width="89px" />
              <Typography variant="body1" className={classes.iconText}>
                {vendor.final_rating} ({vendor?.ratings?.length} reviews)
              </Typography>
            </div>
          </Grid>
        </Grid>

        <div className={classes.presentation}>
          <Typography variant="h4" className={classes.heading}>
            <b>Presentation</b>
          </Typography>
          <hr className={classes.hr} />
          <Typography variant="body1" className={classes.text}>
            {vendor.description}
          </Typography>
        </div>

        <div className={classes.menu}>
          <Typography variant="h4" className={classes.heading}>
            <b>Menu</b>
          </Typography>
          <hr className={classes.hr} />
          {/* <Button
            variant="contained"
            className={classes.btn}
            onClick={handleMenuOpen}
          >
            See the menu
          </Button> */}
          <img
            src={`${baseUrl}/${vendor.menu_image}`}
            alt="Menu"
            className={classes.menu_image}
            onClick={handleMenuOpen}
          />
        </div>

        <div className={classes.website}>
          <Typography variant="h4" className={classes.heading}>
            <b>Website and Social Media</b>
          </Typography>
          <hr className={classes.hr} />
          <Typography variant="body1" className={classes.text}>
            <a
              href={vendor.website}
              target="_blank"
              rel="noreferrer"
              className={classes.socialLinks}
            >
              <img src={WebIcon} alt="Web" width="38px" />
            </a>
            <a
              href={vendor.facebook_page}
              target="_blank"
              rel="noreferrer"
              className={classes.socialLinks}
            >
              <img src={FacebookIcon} alt="Facebook" width="38px" />
            </a>
            <a
              href={vendor.instagram_page}
              target="_blank"
              rel="noreferrer"
              className={classes.socialLinks}
            >
              <img src={InstagramIcon} alt="Instagram" width="38px" />
            </a>
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Profile;
