import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Styles
const useStyles = makeStyles((theme) => ({
  input: {
    "-webkit-width": "400px",
    "-webkit-border-color": "black",
    border: "1px solid black",
    width: "400px",
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
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginBottom: "20px",
    color: theme.palette.primary.dark,
  },
  submit: {
    width: "100px",
    height: "40px",
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    border: "none",
    cursor: "pointer",
  },
}));

const LoginForm = ({ data, handleChange, handleSubmit }) => {
  const classes = useStyles();

  const renderInput = (type, name, placeholder = "") => {
    return (
      <>
        <input
          type={type}
          name={name}
          // value={data[name]}
          placeholder={placeholder}
          className={classes.input}
          onChange={handleChange}
        />
        {/* {errors[name] && <p className={classes.inputText}>{errors[name]}</p>} */}
      </>
    );
  };

  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.heading}>
        Vendor Login
      </Typography>

      {renderInput("email", "email", "example@example.com")}
      {renderInput("password", "password", "password")}

      <button className={classes.submit} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default LoginForm;
