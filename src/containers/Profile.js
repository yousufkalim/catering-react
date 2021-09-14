// Init
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Joi from "joi-browser";
// import axios from "axios";
import { toast } from "react-toastify";

// Importing Components
import Header from "../components/Header";
import Register from "../components/Register.jsx";
import Api from "../api/index";
import { validate, validateProperty } from "../utils/joiFunctions";
import { Helmet } from "react-helmet";

// Home Component
export default function Profile() {
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});
  const [vendorData, setVendorData] = useState({
    company_name: "",
    phone: "",
    website: "",
    facebook_page: "",
    instagram_page: "",
    description: "",
    price: "",
    max_people_limit: "",
    business_type: "",
    delivery_radius: "",
    is_delivering: "",
    dine_in_options: "",
    new_password: "",
    old_password: "",
  });
  const [foodType, setFoodType] = useState([]);
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [menuImage, setMenuImage] = useState(null);
  const [menuImageBlob, setMenuImageBlob] = useState(null);
  const [allAddresses, setAllAddresses] = useState([]);
  const [address, setAddress] = useState({
    label: "",
    lat: "",
    lng: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const history = useHistory();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  // const placesApiKey = process.env.REACT_APP_GOOGLE_PLACES_KEY;

  useEffect(() => {
    checkingAuth();
  }, []);

  const checkingAuth = async () => {
    const { data } = await Api("get", "/api/vendors/check-auth");

    setUserId(data.user._id);
    setVendorData({
      company_name: data.user.company_name,
      phone: data.user.phone,
      website: data.user.website,
      facebook_page: data.user.facebook_page,
      instagram_page: data.user.instagram_page,
      description: data.user.description,
      price: data.user.price,
      max_people_limit: data.user.max_people_limit,
      business_type: data.user.business_type,
      delivery_radius: data.user.delivery_radius,
      is_delivering: data.user.is_delivering ? "true" : "false",
      dine_in_options: data.user.dine_in_options ? "true" : "false",
      new_password: "",
      old_password: "",
    });
    setFoodType(data.user.food_type);
    setAddress({
      label: data.user.address.label,
      lat: data.user.address.lat,
      lng: data.user.address.lng,
    });
    setAddressValue({
      formatted_address: data.user.address.label,
      geometry: {
        location: {
          lat: data.user.address.lat,
          lng: data.user.address.lng,
        },
      },
    });
    setImageBlob(`${baseUrl}/${data.user.image}`);
    setMenuImageBlob(`${baseUrl}/${data.user.image}`);
  };

  const vendorSchema = {
    company_name: Joi.string().min(3).required().label("Company Name"),
    phone: Joi.string().required().label("Phone"),
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
    new_password: Joi.string().allow("").min(5).label("New Password"),
    old_password: Joi.string().allow("").min(5).label("Old Password"),
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const allErrors = { ...errors };
    const errorMessage = validateProperty(name, value, vendorSchema);
    if (errorMessage) allErrors[name] = errorMessage;
    else delete allErrors[name];
    setErrors(allErrors);

    const formData = { ...vendorData };
    formData[name] = value;
    setVendorData(formData);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate(vendorData, vendorSchema);
    if (!errors && foodType.length < 1) {
      errors = {
        food_type: "Choose at least one Food Type",
      };
      setErrors(errors);
    } else {
      setErrors(errors || {});
    }
    if (errors) return;

    await Api("put", `/api/vendors/${userId}`, mapToFormData(vendorData));
    toast.success("Vendor Updated");
    history.replace("/");
  };

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

    if (menuImage) {
      fd.append("menu_image", menuImage);
    }
    if (image) {
      fd.append("image", image);
    }

    foodType.forEach((item, index) => {
      fd.append(`food_type[${index}]`, item);
    });

    return fd;
  };

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

  const handleInputValue = (value) => setInputValue(value);

  return (
    <div>
      <Helmet>
        <title>Update Vendors</title>
        <meta
          name="description"
          content="H-Catering is a website to help the Muslims in DMV to find the best catering option for their upcoming event easily !We help muslim business owners to promote their business."
        />
        <meta
          name="keywords"
          content="Vendors, Vendors Update Form, Update Form, Vendors Profile"
        />
      </Helmet>

      <Header />
      <Register
        data={vendorData}
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
