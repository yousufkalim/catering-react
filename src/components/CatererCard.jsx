import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: { minHeight: "330px" },
  btnArea: { display: "flex", justifyContent: "center" },
  btn: {
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    backgroundColor: "transparent",
    maxHeight: "40px",
    paddingRight: "20px",
    paddingLeft: "20px",
    borderRadius: "10px",
    transitionProperty: "background-color, color",
    transitionDuration: "0.4s",
    "transition-timing-function": "linear",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
  },
  cardHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingDiv: {
    marginBottom: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingIcon: {
    fontSize: "18px",
    paddingTop: "5px",
    color: "#F8CF46",
    marginLeft: "5px",
  },
}));

const CatererCard = ({ vendor, selectedVendor }) => {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  return (
    <Card
      className={classes.root}
      style={selectedVendor === vendor._id ? { border: "2px solid blue" } : {}}
    >
      <CardMedia
        component="img"
        alt="caterer"
        height="140"
        image={`${baseUrl}/${vendor.image}`}
        title="Contemplative Reptile"
      />
      <CardContent>
        <div className={classes.cardHeading}>
          <Typography
            gutterBottom
            variant="h6"
            component="span"
            style={{ marginBottom: 0 }}
          >
            {vendor.company_name}
          </Typography>
          <Typography gutterBottom variant="caption">
            {vendor.price}$
          </Typography>
        </div>

        <div className={classes.ratingDiv}>
          <Typography gutterBottom variant="caption">
            <em>{vendor.address.city}</em>
          </Typography>
          <Typography gutterBottom variant="caption">
            <StarIcon className={classes.ratingIcon} />
            {vendor.final_rating} ({vendor.ratings?.length} ratings)
          </Typography>
        </div>

        <Typography variant="body2" color="textSecondary" component="p">
          {vendor.description.substring(0, 75)}
          {vendor.description.length > 75 ? "..." : ""}
        </Typography>
      </CardContent>
      <CardActions className={classes.btnArea}>
        <Link to={`/vendor/${vendor._id}`} style={{ textDecoration: "none" }}>
          <Button
            size="small"
            // variant="contained"
            className={classes.btn}
            // color="primary"
          >
            See Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CatererCard;
