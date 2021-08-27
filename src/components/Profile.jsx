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
    backgroundColor: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
    },
  },
});

const Profile = () => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <div className={classes.icons}>
          <div className={classes.iconDiv}>
            <img src={AddressIcon} alt="address" width="65px" />
            <Typography variant="body1" className={classes.iconText}>
              Address
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
              20 Miles
            </Typography>
          </div>
          <div className={classes.iconDiv}>
            <img src={MaxPeopleIcon} alt="address" width="82px" />
            <Typography variant="body1" className={classes.iconText}>
              Max 30 People
            </Typography>
          </div>
          <div className={classes.iconDiv}>
            <img src={CashIcon} alt="address" width="79px" />
            <Typography variant="body1" className={classes.iconText}>
              $$$$
            </Typography>
          </div>
          <div className={classes.iconDiv}>
            <img src={RatingIcon} alt="address" width="89px" />
            <Typography variant="body1" className={classes.iconText}>
              4.1 (32 reviews)
            </Typography>
          </div>
        </div>

        <div className={classes.presentation}>
          <Typography variant="h4" className={classes.heading}>
            <b>Presentation</b>
          </Typography>
          <hr className={classes.hr} />
          <Typography variant="body1" className={classes.text}>
            Le Bolly-Bolly is a restaurant which is serving a lot of different
            varieties of food : <br /> Kabob, salads, sandwiches.
            <br />
            <br />
            Please feel free to join us for your catering events.
          </Typography>
        </div>

        <div className={classes.menu}>
          <Typography variant="h4" className={classes.heading}>
            <b>Menu</b>
          </Typography>
          <hr className={classes.hr} />
          <Button variant="contained" className={classes.btn}>
            See the menu
          </Button>
        </div>

        <div className={classes.website}>
          <Typography variant="h4" className={classes.heading}>
            <b>Website and Social medias</b>
          </Typography>
          <hr className={classes.hr} />
        </div>
      </Container>
    </>
  );
};

export default Profile;
