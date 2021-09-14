import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StarsRating from "stars-rating";
import TextField from "@material-ui/core/TextField";

// styles
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "450px",
    // width: "450px",
  },
  ratingDiv: { display: "flex", justifyContent: "center" },
  btn: {
    marginTop: "20px",
    width: "100%",
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
  },
  heading: { color: theme.palette.primary.dark },
  field: {
    width: "100%",
    marginBottom: "20px",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#2662b1",
      },
    },
  },
}));

const AddReviewModal = ({
  review,
  rating,
  errors,
  handleChange,
  handleRatingChange,
  handleSubmit,
}) => {
  const classes = useStyles();

  // Function for rendering input fields
  const renderInput = (type, name, placeholder = "") => {
    return (
      <>
        <TextField
          required
          id={name}
          label={placeholder}
          type={type}
          name={name}
          variant="outlined"
          value={review[name]}
          className={classes.field}
          onChange={handleChange}
          error={errors[name]}
          helperText={errors[name]}
          style={name === "delivery_radius" ? { maxWidth: "600px" } : {}}
        />
      </>
    );
  };

  return (
    <div className={classes.container}>
      <Typography
        variant="h4"
        className={classes.heading}
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
