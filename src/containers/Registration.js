// Init
import React, { useState } from "react";
import Joi from "joi-browser";

// Importing Components
import Header from "../components/Header";
import Register from "../components/Register.jsx";
import Api from "../api/index";

// Home Component
export default function Registration() {
  const [errors, setErrors] = useState({});
  const [registerData, setRegisterData] = useState({});
  const [foodType, setFoodType] = useState([]);

  const registerSchema = {
    company_name: Joi.string().min(3).required().label("Company Name"),
    phone: Joi.string().required().label("Phone"),
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
    delivery_radius: Joi.number().greater(0).required().label("Price"),
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
    const result = Joi.validate(registerData, registerSchema, options);
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path] = item.message;
    }
    return errors;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
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

    
  };

  return (
    <div>
      <Header />
      <Register
        data={registerData}
        errors={errors}
        handleChange={handleChange}
        handleFoodTypeChange={handleFoodTypeChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
