import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

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
  inputText: {
    marginBottom: "20px",
    color: "red",
    fontSize: "small",
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
  uploadBtn: {
    marginTop: "10px",
  },
});

const Register = ({
  data,
  image,
  foodType,
  menuImage,
  errors,
  handleChange,
  handleImageChange,
  handleFoodTypeChange,
  handleSubmit,
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const renderInput = (type, name, placeholder) => {
    return (
      <>
        <input
          type={type}
          name={name}
          value={data[name]}
          placeholder={placeholder}
          className={classes.input}
          onChange={handleChange}
        />
        {errors[name] && <p className={classes.inputText}>{errors[name]}</p>}
      </>
    );
  };

  const renderRadioBtnWIthLabel = (label, name, localData) => {
    return (
      <FormControl component="fieldset" className={classes.radioBtns}>
        <FormLabel component="legend" className={classes.label}>
          {label}
        </FormLabel>
        <RadioGroup
          name={name}
          color="primary"
          value={data[name]}
          onChange={handleChange}
        >
          {localData.map((item) => (
            <FormControlLabel
              value={item.value}
              style={{ display: "flex", justifyContent: "center" }}
              control={<Radio color="primary" />}
              label={item.label}
            />
          ))}
        </RadioGroup>
        {errors[name] && <p className={classes.inputText}>{errors[name]}</p>}
      </FormControl>
    );
  };

  const renderCheckBox = (label, name) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={foodType.includes(name) ? true : false}
            onChange={handleFoodTypeChange}
            name={name}
            color="primary"
          />
        }
        label={label}
      />
    );
  };

  const renderInputBtn = (name, label, imageData) => {
    return (
      <label htmlFor={name}>
        <input
          style={{ display: "none" }}
          id={name}
          name={name}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />

        <Button
          variant="contained"
          component="span"
          style={{ fontSize: "12px", background: "black", color: "white" }}
          className={classes.uploadBtn}
        >
          {label}
        </Button>
        {imageData && (
          <Typography
            variant="body1"
            style={{ textAlign: "center", marginTop: "5px" }}
          >
            {imageData.name}
          </Typography>
        )}
      </label>
    );
  };

  return (
    <div className={classes.main}>
      <Typography variant="h3">
        {pathname === "/register" ? "Vendors Registration" : "Update Details"}
      </Typography>

      <Typography variant="body1" className={classes.caption}>
        Please join our network, and get leads for catering opportunities.
        <br /> We will promote your business to the muslim community.
      </Typography>
      <div className={classes.form}>
        {renderInput("text", "company_name", "Name of the company")}
        {renderInput("text", "phone", "Phone Number")}
        {pathname === "/register" && (
          <> {renderInput("email", "email", "E-mail address")} </>
        )}
        {renderInput("text", "website", "Website")}
        {renderInput("text", "facebook_page", "Facebook Page")}
        {renderInput("text", "instagram_page", "Instagram Page")}
        {pathname === "/register" && (
          <>
            {renderInput("password", "password", "Password")}
            {renderInput("password", "confirm_password", "Confirm Password")}
          </>
        )}
        {/* {pathname === "/profile" && (
          <>
            {renderInput("password", "old_password", "Old Password")}
            {renderInput("password", "new_password", "New Password")}
          </>
        )} */}
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
        {renderRadioBtnWIthLabel("Dine In Options", "dine_in_options", [
          { value: "true", label: "Yes" },
          { value: "false", label: "No" },
        ])}
        {renderInput("number", "delivery_radius", "Miles")}
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
        {errors["food_type"] && (
          <p className={classes.inputText}>{errors["food_type"]}</p>
        )}

        {renderInputBtn("menu_image", "Upload Menu Image", menuImage)}
        {renderInputBtn("image", "Upload Image", image)}

        <button className={classes.submit} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Register;
