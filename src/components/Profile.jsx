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
} from "../assets/images";
import Tooltip from "@material-ui/core/Tooltip";
import { Store } from "../StoreContext";

// styles
const useStyles = makeStyles({
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
  heading: { marginBottom: "10px" },
  text: { marginTop: "20px" },
  hr: {
    backgroundColor: "black",
    border: "1px solid black",
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
});

const Profile = ({ vendor, vendorId, handleMenuOpen, handleReviewsOpen }) => {
  const classes = useStyles();
  const { user } = Store();
  console.log(user);

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
              <div>
                <img src={AddressIcon} alt="address" width="65px" />
                <Typography variant="body1" className={classes.iconText}>
                  {vendor?.address?.label.substring(0, 20)}...
                </Typography>
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <img
              src={DeliveryIcon}
              alt="address"
              width="110px"
              style={{ marginTop: "7px" }}
            />
            <Typography variant="body1" className={classes.iconText}>
              {vendor.delivery_radius} Miles
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <img src={MaxPeopleIcon} alt="address" width="82px" />
            <Typography variant="body1" className={classes.iconText}>
              Max {vendor.max_people_limit} People
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <img src={CashIcon} alt="address" width="79px" />
            <Typography variant="body1" className={classes.iconText}>
              {vendor.price}$
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} className={classes.iconDiv}>
            <div
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
          <Button
            variant="contained"
            className={classes.btn}
            onClick={handleMenuOpen}
          >
            See the menu
          </Button>
        </div>

        <div className={classes.website}>
          <Typography variant="h4" className={classes.heading}>
            <b>Website and Social medias</b>
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
