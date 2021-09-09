import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StarsRating from "stars-rating";

// styles
const useStyles = makeStyles({
  container: {
    maxWidth: "450px",
    width: "450px",
  },
  input: {
    "-webkit-width": "400px",
    "-webkit-border-color": "black",
    border: "1px solid black",
    width: "100%",
    maxwidth: "400px",
    height: "40px",
    padding: "10px",
    marginBottom: "20px",
    textAlign: "center",
    "&:focus": {
      border: "none",
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: "#3f51b5",
    },
    "&::placeholder": { textAlign: "center" },
  },
  ratingDiv: { display: "flex", justifyContent: "center" },
  btn: {
    marginTop: "20px",
    width: "100%",
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  inputText: {
    textAlign: "center",
    marginBottom: "20px",
    color: "red",
    fontSize: "small",
  },
});

const AddReviewModal = ({
  review,
  rating,
  errors,
  handleChange,
  handleRatingChange,
  handleSubmit,
}) => {
  const classes = useStyles();

  const renderInput = (type, name, placeholder = "") => {
    return (
      <>
        <input
          type={type}
          name={name}
          value={review[name]}
          placeholder={placeholder}
          className={classes.input}
          onChange={handleChange}
        />
        {errors[name] && <p className={classes.inputText}>{errors[name]}</p>}
      </>
    );
  };

  return (
    <div className={classes.container}>
      <Typography
        variant="h4"
        style={{ fontFamily: "TektonPro", marginBottom: "20px" }}
      >
        <b>Add Rating</b>
      </Typography>

      {renderInput("text", "username", "Username")}
      {renderInput("text", "comment", "Comment")}
      <div className={classes.ratingDiv}>
        <StarsRating
          count={5}
          onChange={handleRatingChange}
          size={30}
          value={rating}
          color2={"#ffd700"}
          half={false}
        />
      </div>

      <Button
        variant="contained"
        className={classes.btn}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
  );
};

export default AddReviewModal;
