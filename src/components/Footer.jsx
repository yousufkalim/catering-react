import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  container: {
    backgroundColor: "black",
    color: "white",
    padding: "50px",
    paddingBottom: "20px",
  },
  text: { marginTop: "20px" },
  tagline: { textAlign: "center", marginTop: "20px" },
  copyright: { marginTop: "5px", textAlign: "center" },
  heart: { color: "red", transform: "translateY(7px)" },
});

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h5">
        <b>Who we are?</b>
      </Typography>
      <Typography variant="body1" className={classes.text}>
        H-Catering is a website to help the Muslims in DMV to find the best
        catering option for their upcoming event easily ! <br /> We help muslim
        business owners to promote their business.
      </Typography>

      <Typography variant="body1" className={classes.tagline}>
        Developed with love <FavoriteIcon className={classes.heart} /> for a
        better web
      </Typography>

      <Typography variant="body1" className={classes.copyright}>
        &#169; 2021 - Falcon IT Consulting.
      </Typography>
    </div>
  );
};

export default Footer;
