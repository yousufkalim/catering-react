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
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import BackupIcon from "@material-ui/icons/Backup";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
  },
  heading: { color: theme.palette.primary.dark },
  caption: { textAlign: "center", marginTop: "20px" },
  form: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "60vw",
  },
  field: {
    width: "100%",
    // marginBottom: "20px",
    textAlign: "center",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#2662b1",
      },
    },
  },
  // input: { height: "50px" },
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
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  uploadBtn: {
    marginTop: "10px",
  },
  autoComplete: {
    width: "100%",
    marginTop: "10px",
  },
  radioBtnGridItem: {
    display: "flex",
    justifyContent: "center",
  },
  // addressField: {
  //   "& button": { marginTop: "-5px" },
  //   "& fieldset": {
  //     height: "50px",
  //     border: "1px solid rgba(0,0,0,0.5)",
  //   },
  //   "& label": {
  //     marginTop: "-4px",
  //     fontSize: "14px",
  //     color: "gray",
  //   },
  // },
  imgDiv: {
    height: "250px",
    width: "220px",
    backgroundColor: "lightgray",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imgInput: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    opacity: 0,
    cursor: "pointer",
  },
  blob: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    borderRadius: "10px",
    cursor: "pointer",
    objectFit: "cover",
  },
}));

const Register = ({
  data,
  image,
  foodType,
  addresses,
  address,
  menuImage,
  menuImageBlob,
  imageBlob,
  errors,
  addressValue,
  inputValue,
  handleChange,
  handleInputValue,
  handleImageChange,
  handleGetAddress,
  handleAddressChange,
  handleFoodTypeChange,
  handleSubmit,
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const renderInput = (type, name, placeholder, label = "") => {
    return (
      <>
        <label htmlFor={name}>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            <b>{label}</b>
          </Typography>
        </label>
        <TextField
          required
          id={name}
          label={placeholder}
          type={type}
          name={name}
          variant="outlined"
          value={data[name]}
          className={classes.field}
          InputProps={{
            className: classes.input,
          }}
          onChange={handleChange}
          error={errors[name]}
          helperText={errors[name]}
          style={name === "delivery_radius" ? { maxWidth: "600px" } : {}}
        />
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
            checked={foodType?.includes(name) ? true : false}
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
      <div className={classes.imgDiv}>
        <Typography variant="subtitle1" style={{ textAlign: "center" }}>
          {label} (PNG/JPG)
        </Typography>
        <BackupIcon className={classes.icon} />
        <Typography variant="caption">Max Size 5MB</Typography>
        {imageData && (
          <img src={imageData} alt="profile" className={classes.blob} />
        )}
        <input
          type="file"
          name={name}
          id={name}
          accept="image/png, image/jpeg"
          className={classes.imgInput}
          onChange={handleImageChange}
        />
      </div>
    );
  };

  return (
    <div className={classes.main}>
      <Typography variant="h3" className={classes.heading}>
        {pathname === "/register" ? "Vendors Registration" : "Update Details"}
      </Typography>

      <Typography variant="body1" className={classes.caption}>
        Please join our network, and get leads for catering opportunities.
        <br /> We will promote your business to the muslim community.
      </Typography>
      <div className={classes.form}>
        {/* Grid for input fields */}
        <Grid container spacing={1} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6}>
            {renderInput("text", "company_name", "Name of the company")}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={addressValue}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) =>
                handleInputValue(newInputValue)
              }
              id="combo-box-demo"
              options={addresses}
              getOptionLabel={(option) => option.formatted_address}
              classes={{ root: classes.autoComplete }}
              onChange={(e) => handleAddressChange(e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={classes.addressField}
                  label="Address"
                  variant="outlined"
                  onChange={(e) => handleGetAddress(e)}
                />
              )}
            />
          </Grid>

          {pathname === "/register" && (
            <Grid item xs={12} sm={6}>
              {renderInput("email", "email", "E-mail address")}{" "}
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            {renderInput("text", "phone", "Phone Number")}
          </Grid>

          {pathname === "/register" && (
            <>
              <Grid item xs={12} sm={6}>
                {renderInput("password", "password", "Password")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderInput(
                  "password",
                  "confirm_password",
                  "Confirm Password"
                )}
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={6}>
            {renderInput("text", "description", "Description")}
          </Grid>

          <Grid item xs={12} sm={6}>
            {renderInput("text", "website", "Website")}
          </Grid>

          <Grid item xs={12} sm={6}>
            {renderInput("text", "facebook_page", "Facebook Page")}
          </Grid>

          <Grid item xs={12} sm={6}>
            {renderInput("text", "instagram_page", "Instagram Page")}
          </Grid>

          <Grid item xs={12} sm={6}>
            {renderInput("number", "price", "Price")}
          </Grid>

          <Grid item xs={12} sm={6}>
            {renderInput("number", "max_people_limit", "Max People Limit")}
          </Grid>
        </Grid>

        {/* Grid For radio buttons */}
        <Grid container spacing={1} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={4} className={classes.radioBtnGridItem}>
            {renderRadioBtnWIthLabel("Type of Business:", "business_type", [
              { value: "restaurant", label: "Restaurant" },
              { value: "caterer", label: "Caterer" },
            ])}
          </Grid>

          <Grid item xs={12} sm={4} className={classes.radioBtnGridItem}>
            {renderRadioBtnWIthLabel("Dine In Options:", "dine_in_options", [
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ])}
          </Grid>

          <Grid item xs={12} sm={4} className={classes.radioBtnGridItem}>
            {renderRadioBtnWIthLabel(
              "Do you provide delivery ?",
              "is_delivering",
              [
                { value: "true", label: "Yes" },
                { value: "false", label: "No" },
              ]
            )}
          </Grid>
        </Grid>

        {renderInput(
          "number",
          "delivery_radius",
          "Miles",
          "If yes, please be precise how far from your location:"
        )}

        <Typography variant="body1" style={{ marginTop: "20px" }}>
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

        <Grid
          container
          spacing={2}
          style={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <Grid item xs={12} md={3} />
          <Grid
            item
            xs={12}
            md={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {renderInputBtn("menu_image", "Upload Menu Image", menuImageBlob)}
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {renderInputBtn("image", "Upload Image", imageBlob)}
          </Grid>
          <Grid item xs={12} md={3} />
        </Grid>

        <button className={classes.submit} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Register;
