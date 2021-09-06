// Init
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Joi from "joi-browser";

// Importing Components
import Header from "../components/Header";
import Register from "../components/Register.jsx";
import Api from "../api/index";
import { toast } from "react-toastify";

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
  });
  const [foodType, setFoodType] = useState([]);
  const [image, setImage] = useState(null);
  const [menuImage, setMenuImage] = useState(null);
  const history = useHistory();

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
    });
    setFoodType(data.user.food_type);
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
    // new_password: Joi.string().min(5).required().label("New Password"),
    // old_password: Joi.string().min(5).required().label("Old Password"),
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

  const validateProperty = (name, value, Schema) => {
    const obj = { [name]: value };
    const schema = {
      [name]: Schema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false };
    let errors = {};
    const result = Joi.validate(vendorData, vendorSchema, options);
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path] = item.message;
    }
    return errors;
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
    } else {
      setImage(files[0] !== undefined ? files[0] : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
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
    const address = {
      lat: -20.896846,
      lng: 55.493667,
      postal_code: 20110,
      label: "A Paratella 20110 Propriano",
      city: "Propriano",
    };

    Object.keys(body).forEach((item) => {
      fd.append(item, body[item]);
    });

    Object.keys(address).forEach((item) => {
      fd.append(`address.${item}`, address[item]);
    });

    if (menuImage) {
      fd.append("menu_image", menuImage);
    }
    if (image) {
      fd.append("image", image);
    }

    fd.append("food_type", JSON.stringify(foodType));

    return fd;
  };

  return (
    <div>
      <Header />
      <Register
        data={vendorData}
        image={image}
        foodType={foodType}
        menuImage={menuImage}
        errors={errors}
        handleChange={handleChange}
        handleFoodTypeChange={handleFoodTypeChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
