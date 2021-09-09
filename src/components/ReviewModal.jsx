// Init
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// styles
const useStyles = makeStyles({
  container: {
    maxWidth: "450px",
    width: "450px",
  },
  headingDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    "& button": {
      maxHeight: "30px",
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
    },
  },
  hr: {
    width: "80px",
    border: "2px solid black",
    background: "black",
    marginBottom: "30px",
  },
  reviewList: {
    maxHeight: "70vh",
    overflowX: "hidden",
    overflowY: "scroll",
    paddingRight: "10px",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgb(0,0,0,0)",
    },
  },
  review: {
    display: "flex",
  },
  comment: {
    marginLeft: "10px",
    marginBottom: "20px",
  },
});

const ReviewModal = ({ ratings, handleOpenAddReview }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headingDiv}>
        <Typography variant="h4" style={{ fontFamily: "TektonPro" }}>
          <b>Ratings</b>
        </Typography>
        <Button variant="contained" onClick={handleOpenAddReview}>
          Add
        </Button>
      </div>
      <hr className={classes.hr} />

      <div className={classes.reviewList}>
        {ratings.map((rating) => (
          <div className={classes.review}>
            <Avatar>{rating.username.substring(0, 1).toUpperCase()}</Avatar>
            <div className={classes.comment}>
              <Typography variant="body2" style={{ paddingLeft: "3px" }}>
                <b>{rating.username}</b>
              </Typography>
              {[1, 2, 3, 4, 5].map((item) => {
                if (rating.rating >= item) {
                  return <StarIcon />;
                } else return <StarBorderIcon />;
              })}
              <Typography variant="body2" style={{ paddingLeft: "3px" }}>
                {rating.comment}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewModal;
