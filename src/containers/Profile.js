// Init
import React, { useEffect, useState } from "react";
import Joi from "joi-browser";

// Importing Components
import Header from "../components/Header";
import Register from "../components/Register.jsx";
import { Store } from "../StoreContext";

// Home Component
export default function Profile() {
  const [errors, setErrors] = useState({});
  const [vendorData, setVendorData] = useState({});
  const [foodType, setFoodType] = useState([]);
  const [image, setImage] = useState(null);
  const [menuImage, setMenuImage] = useState(null);
  const { user } = Store();

  useEffect(() => {
    console.log("user", user);
    setVendorData({
      company_name: user.company_name,
      phone: user.phone,
      website: user.website,
      facebook_page: user.facebook_page,
      instagram_page: user.instagram_page,
      description: user.description,
      price: user.price,
      max_people_limit: user.max_people_limit,
      business_type: user.business_type,
      delivery_radius: user.delivery_radius,
      is_delivering: user.is_delivering ? "true" : "false",
      dine_in_options: user.dine_in_options ? "true" : "false",
    });
    setFoodType(user.food_type);
  }, []);

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
