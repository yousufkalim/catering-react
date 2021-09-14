// Init
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// styles
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "450px",
    // width: "450px",
  },
  heading: { color: theme.palette.primary.dark, fontFamily: "TektonPro" },
  headingDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    "& button": {
      maxHeight: "30px",
      backgroundColor: theme.palette.primary.dark,
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        color: "white",
      },
    },
  },
  hr: {
    width: "80px",
    border: `2px solid ${theme.palette.primary.dark}`,
    background: theme.palette.primary.dark,
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
  avatar: { backgroundColor: theme.palette.primary.dark },
}));

const ReviewModal = ({ ratings, handleOpenAddReview }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.headingDiv}>
        <Typography variant="h4" className={classes.heading}>
          <b>Ratings</b>
        </Typography>
        <Button onClick={handleOpenAddReview}>Add</Button>
      </div>
      <hr className={classes.hr} />

      <div className={classes.reviewList}>
        {ratings.map((rating) => (
          <div className={classes.review}>
            <Avatar className={classes.avatar}>
              {rating.username.substring(0, 1).toUpperCase()}
            </Avatar>
            <div className={classes.comment}>
              <Typography variant="body2" style={{ paddingLeft: "3px" }}>
                <b>{rating.username}</b>
              </Typography>
              {[1, 2, 3, 4, 5].map((item) => {
                if (rating.rating >= item) {
                  return <StarIcon style={{ color: "rgb(255, 215, 0)" }} />;
                } else
                  return (
                    <StarBorderIcon style={{ color: "rgb(255, 215, 0)" }} />
                  );
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
