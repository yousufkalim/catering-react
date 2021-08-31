import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  AddressIcon,
  CashIcon,
  DeliveryIcon,
  MaxPeopleIcon,
  RatingIcon,
} from "../assets/images";

// styles
const useStyles = makeStyles({
  icons: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
  },
  iconDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "5px",
    marginLeft: "5px",
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
});

const Profile = ({ vendor, handleMenuOpen }) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <div className={classes.icons}>
          <div className={classes.iconDiv}>
            <img src={AddressIcon} alt="address" width="65px" />
            <Typography variant="body1" className={classes.iconText}>
              {vendor?.address?.label}
            </Typography>
          </div>
          <div className={classes.iconDiv}>
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
          <div className={classes.iconDiv}>
            <img src={MaxPeopleIcon} alt="address" width="82px" />
            <Typography variant="body1" className={classes.iconText}>
              Max {vendor.max_people_limit} People
            </Typography>
          </div>
          <div className={classes.iconDiv}>
            <img src={CashIcon} alt="address" width="79px" />
            <Typography variant="body1" className={classes.iconText}>
              {vendor.price}$
            </Typography>
          </div>
          <div className={classes.iconDiv}>
            <img src={RatingIcon} alt="address" width="89px" />
            <Typography variant="body1" className={classes.iconText}>
              {vendor.final_rating} ({vendor?.ratings?.length} reviews)
            </Typography>
          </div>
        </div>

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
            {vendor.website} <br />
            {vendor.facebook_page} <br />
            {vendor.instagram_page} <br />
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Profile;
