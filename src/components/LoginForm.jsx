import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

// Styles
const useStyles = makeStyles((theme) => ({
  field: {
    width: "100%",
    marginBottom: "20px",
    textAlign: "center",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#2662b1",
      },
    },
  },
  input: { height: "50px" },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "400px",
    width: "90vw",
  },
  heading: { marginBottom: "20px", color: theme.palette.primary.dark },
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
        <TextField
          required
          id={name}
          label={name}
          type={type}
          name={name}
          variant="outlined"
          value={data[name]}
          placeholder={placeholder}
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input,
          }}
          onChange={handleChange}
        />
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
