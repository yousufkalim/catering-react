import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
  },
  caption: { textAlign: "center", marginTop: "20px" },
  form: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "400px",
    maxwidth: "400px",
    height: "40px",
    padding: "10px",
    marginBottom: "20px",
    textAlign: "center",
    "&::placeholder": { textAlign: "center" },
  },
  label: { color: "black", fontWeight: "bold", marginBottom: "10px" },
  radioBtns: { marginBottom: "20px" },
  submit: {
    width: "100px",
    height: "40px",
    marginTop: "20px",
    marginBottom: "20px",
    backgroundColor: "#2D0D79",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
});

const Register = () => {
  const classes = useStyles();

  const renderInput = (type, name, placeholder) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={classes.input}
      />
    );
  };

  const renderRadioBtnWIthLabel = (label, name, data) => {
    return (
      <FormControl component="fieldset" className={classes.radioBtns}>
        <FormLabel component="legend" className={classes.label}>
          {label}
        </FormLabel>
        <RadioGroup
          name={name}
          color="primary"
          // value={value}
          // onChange={handleChange}
        >
          {data.map((item) => (
            <FormControlLabel
              value={item.value}
              style={{ display: "flex", justifyContent: "center" }}
              control={<Radio color="primary" />}
              label={item.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  const renderCheckBox = (label, name) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            // checked={state.checkedB}
            // onChange={handleChange}
            name={name}
            color="primary"
          />
        }
        label={label}
      />
    );
  };

  return (
    <div className={classes.main}>
      <Typography variant="h3">Vendors Registration</Typography>

      <Typography variant="body1" className={classes.caption}>
        Please join our network, and get leads for catering opportunities.
        <br /> We will promote your business to the muslim community.
      </Typography>
      <form className={classes.form}>
        {renderInput("text", "company_name", "Name of the company")}
        {renderInput("text", "phone", "Phone Number")}
        {renderInput("email", "email", "E-mail address")}
        {/* {renderInput("address", "email", "E-mail address")} */}
        {renderInput("text", "website", "Website")}
        {renderInput("text", "facebook_page", "Facebook Page")}
        {renderInput("text", "instagram_page", "Instagram Page")}
        {renderInput("password", "password", "Password")}
        {renderInput("password", "confirm_password", "Confirm Password")}
        {renderInput("text", "description", "Description")}
        {renderInput("number", "price", "Price")}
        {renderInput("number", "max_people_limit", "Max People Limit")}
        {renderRadioBtnWIthLabel("Type of Business", "business_type", [
          { value: "restaurant", label: "Restaurant" },
          { value: "caterer", label: "Caterer" },
        ])}
        {renderRadioBtnWIthLabel("Do you provide delivery", "is_delivering", [
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ])}
        {renderRadioBtnWIthLabel("Dine In Options", "is_delivering", [
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ])}
        {renderInput("text", "delivery_radius", "Miles")}
        <Typography variant="body1">
          <b>Type of food: </b>
        </Typography>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "40px",
            }}
          >
            {renderCheckBox("Desi (Pakistani / Indian)", "Desi")}
            {renderCheckBox("Mediteranean", "Mediteranean")}
            {renderCheckBox("Chinese/Thai", "Chinese/Thai")}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "40px",
            }}
          >
            {renderCheckBox("Mexican", "Mexican")}
            {renderCheckBox("American type", "American")}
            {renderCheckBox("African", "African")}
          </div>
        </div>
      </form>

      <button className={classes.submit}>Submit</button>
    </div>
  );
};

export default Register;
