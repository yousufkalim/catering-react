import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heading: { marginBottom: "10px" },
});

const LocationMdoal = ({
  allAddresses,
  handleSubmit,
  handleGetAddress,
  handleAddressChange,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" className={classes.heading}>
        Enter or enable location
      </Typography>

      <Autocomplete
        id="combo-box-demo"
        options={allAddresses}
        getOptionLabel={(option) => option.formatted_address}
        onChange={(e) => handleAddressChange(e)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Address"
            variant="outlined"
            onChange={(e) => handleGetAddress(e)}
          />
        )}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        style={{
          width: "100%",
          marginTop: "10px",
          background: "black",
          color: "white",
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default LocationMdoal;
