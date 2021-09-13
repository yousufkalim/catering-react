import Joi from "joi-browser";

export const validateProperty = (name, value, Schema) => {
  const obj = { [name]: value };
  const schema = {
    [name]: Schema[name],
  };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};

export const validate = (data, schema) => {
  const options = { abortEarly: false };
  let errors = {};
  const result = Joi.validate(data, schema, options);
  if (!result.error) return null;
  for (let item of result.error.details) {
    errors[item.path] = item.message;
  }
  return errors;
};
