import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  formControl: {
    width: "100%",
  },
  label: {
    color: "black",
    marginTop: "-5px",
    fontSize: "12px",
    "&.Mui-focused": {
      color: "black",
      marginTop: "0",
      fontSize: "16px",
    },
  },
  outlined: {
    height: "40px",
    textAlign: "left",
    background: "white",
    "&:focus": {
      background: "none",
      borderColor: "transparent !important",
    },
    "& fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black !important",
    },
  },
});

const MuiSelect = ({ data, label, name, value, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Select
        value={value}
        name={name}
        label={label}
        onChange={handleChange}
        className={classes.outlined}
      >
        <MenuItem value=" ">
          <em>All</em>
        </MenuItem>
        {data.map((item) => (
          <MenuItem value={item.value} key={item._id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MuiSelect;
