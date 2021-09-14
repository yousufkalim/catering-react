// Init
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Joi from "joi-browser";
// import axios from "axios";
import { toast } from "react-toastify";

// Importing Components
import Header from "../components/Header";
import Register from "../components/Register.jsx";
import Api from "../api/index";
import { UpdateStore } from "../StoreContext";
import { validate, validateProperty } from "../utils/joiFunctions";
import { Helmet } from "react-helmet";

// Home Component
export default function Registration() {
  // States
  const [errors, setErrors] = useState({});
  const [registerData, setRegisterData] = useState({});
  const [allAddresses, setAllAddresses] = useState([]);
  const [address, setAddress] = useState({
    label: "",
    lat: "",
    lng: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [foodType, setFoodType] = useState([]);
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [menuImage, setMenuImage] = useState(null);
  const [menuImageBlob, setMenuImageBlob] = useState(null);
  const history = useHistory();
  const updateStore = UpdateStore();
  // const placesApiKey = process.env.REACT_APP_GOOGLE_PLACES_KEY;

  // JOI Schema for registration
  const registerSchema = {
    company_name: Joi.string().min(3).required().label("Company Name"),
    phone: Joi.string().max(25).required().label("Phone"),
    email: Joi.string().email().required().label("Email"),
    website: Joi.string()
      .required()
      .uri({ allowQuerySquareBrackets: true })
      .label("Website Link"),
    facebook_page: Joi.string()
      .required()
      .uri({ allowQuerySquareBrackets: true })
      .label("Facebook Link"),
    instagram_page: Joi.string()
      .required()
      .uri({ allowQuerySquareBrackets: true })
      .label("Instagram Link"),
    password: Joi.string().min(5).required().label("Password"),
    confirm_password: Joi.string().min(5).required().label("Confirm Password"),
    description: Joi.string().min(5).required().label("Description"),
    price: Joi.number().greater(0).required().label("Price"),
    max_people_limit: Joi.number()
      .greater(0)
      .required()
      .label("Max People Limit"),
    business_type: Joi.string().required().label("Business Type"),
    is_delivering: Joi.string().required().label("Delivery Option"),
    dine_in_options: Joi.string().required().label("Delivery Option"),
    delivery_radius: Joi.number()
      .greater(0)
      .required()
      .label("Delivery Radius"),
  };

  // Function for input fields onChange Event
  const handleChange = ({ target }) => {
    const { name, value } = target;
    const allErrors = { ...errors };
    const errorMessage = validateProperty(name, value, registerSchema);
    if (errorMessage) allErrors[name] = errorMessage;
    else delete allErrors[name];
    setErrors(allErrors);

    const formData = { ...registerData };
    formData[name] = value;
    setRegisterData(formData);
  };

  // Function for Food type change Event
  const handleFoodTypeChange = ({ target }) => {
    let types = [...foodType];
    const allErrors = { ...errors };
    if (target.checked) {
      types.push(target.name);
      delete allErrors.food_type;
      setErrors(allErrors);
    } else if (!target.checked) {
      types = types.filter((t) => t !== target.name);
      if (types.length < 1) {
        setErrors({ ...errors, food_type: "Choose at least one Food Type" });
      }
    }
    setFoodType(types);
  };

  // Function for Image change Event
  const handleImageChange = ({ target }) => {
    const { name, files } = target;
    if (name === "menu_image") {
      setMenuImage(files[0] !== undefined ? files[0] : null);
      setMenuImageBlob(
        files[0] !== undefined ? URL.createObjectURL(files[0]) : null
      );
    } else {
      setImage(files[0] !== undefined ? files[0] : null);
      setImageBlob(
        files[0] !== undefined ? URL.createObjectURL(files[0]) : null
      );
    }
  };

  // On Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate(registerData, registerSchema);
    if (!errors && registerData.password !== registerData.confirm_password) {
      errors = {
        password: "Password does not match",
        confirm_password: "Password does not match",
      };
      setErrors(errors);
    } else if (!errors && foodType.length < 1) {
      errors = {
        food_type: "Choose at least one Food Type",
      };
      setErrors(errors);
    } else {
      setErrors(errors || {});
    }
    if (errors) return;

    if (!image || !menuImage) {
      toast.error("Vendor and Menu Image is required");
      return;
    }

    if (address.label.length < 1) {
      toast.error("Address is required");
      return;
    }
    const body = { ...registerData };
    delete body.confirm_password;

    const { data } = await Api("post", `/api/vendors`, mapToFormData(body));
    localStorage.setItem("token", data.token);
    updateStore({ user: data.user });
    toast.success("Vendor Registered");
    history.replace("/");
  };

  // Mapping Data to form data function
  const mapToFormData = (body) => {
    const fd = new FormData();
    const localAddress = {
      lat: address.lat,
      lng: address.lng,
      label: address.label,
      city: "Propriano",
    };

    Object.keys(body).forEach((item) => {
      fd.append(item, body[item]);
    });

    Object.keys(localAddress).forEach((item) => {
      fd.append(`address.${item}`, localAddress[item]);
    });

    fd.append("menu_image", menuImage);
    fd.append("image", image);
    foodType.forEach((item, index) => {
      fd.append(`food_type[${index}]`, item);
    });

    return fd;
  };

  // Getting All Addresses function
  const handleGetAddress = async ({ target }) => {
    // delete axios.defaults.headers.common["x-auth-token"];
    // const { data } = await axios.get(
    //   `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${target.value}&inputtype=textquery&fields=formatted_address,name,geometry&key=${placesApiKey}`
    // );
    // axios.defaults.headers.common["x-auth-token"] = localStorage.setItem(
    //   "token",
    //   localStorage.getItem("token")
    // );
    // setAllAddresses(data.candidates);

    const { data } = await Api("get", `/api/places?name=${target.value}`);
    setAllAddresses(data.places);
  };

  // Handle Address change function
  const handleAddressChange = async ({ target }) => {
    if (target.textContent) {
      const index = allAddresses.findIndex(
        (a) => a.formatted_address === target.textContent
      );
      setAddressValue(allAddresses[index]);
      setAddress({
        label: allAddresses[index].formatted_address,
        lat: allAddresses[index].geometry?.location?.lat,
        lng: allAddresses[index].geometry?.location?.lng,
      });
    } else {
      setAddress({
        label: "",
        lat: "",
        lng: "",
      });
    }
  };

  // Setting the Inpput value for address field
  const handleInputValue = (value) => setInputValue(value);

  return (
    <div>
      <Helmet>
        <title>Vendors Registration</title>
        <meta
          name="description"
          content="H-Catering is a website to help the Muslims in DMV to find the best catering option for their upcoming event easily !We help muslim business owners to promote their business."
        />
        <meta
          name="keywords"
          content="Vendors, Vendors Registration Form, Information"
        />
      </Helmet>

      <Header />
      <Register
        data={registerData}
        image={image}
        foodType={foodType}
        addresses={allAddresses}
        address={address}
        menuImage={menuImage}
        menuImageBlob={menuImageBlob}
        imageBlob={imageBlob}
        errors={errors}
        inputValue={inputValue}
        addressValue={addressValue}
        handleInputValue={handleInputValue}
        handleGetAddress={handleGetAddress}
        handleAddressChange={handleAddressChange}
        handleChange={handleChange}
        handleFoodTypeChange={handleFoodTypeChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
