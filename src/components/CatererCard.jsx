import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { HeroImg } from "../assets/images";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles({
  btnArea: { display: "flex", justifyContent: "center" },
  btn: {
    color: "white",
    maxHeight: "40px",
    paddingRight: "20px",
    paddingLeft: "20px",
    borderRadius: "10px",
    backgroundColor: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
    },
  },
  cardHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingDiv: { marginBottom: "5px" },
  ratingIcon: {
    fontSize: "18px",
    paddingTop: "5px",
    color: "#F8CF46",
    marginLeft: "5px",
  },
});

const CatererCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={HeroImg}
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
            Mom’s Café
          </Typography>
          <Typography gutterBottom variant="caption">
            $$$
          </Typography>
        </div>

        <div className={classes.ratingDiv}>
          <Typography gutterBottom variant="caption">
            <em>Arlington, VA</em>
          </Typography>
          <Typography gutterBottom variant="caption" className={classes.rating}>
            <StarIcon className={classes.ratingIcon} />
            4.2 (23 ratings)
          </Typography>
        </div>

        <Typography variant="body2" color="textSecondary" component="p">
          Authentic food with a salad and meat options for all the family.
        </Typography>
      </CardContent>
      <CardActions className={classes.btnArea}>
        <Button size="small" variant="contained" className={classes.btn}>
          See Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default CatererCard;
