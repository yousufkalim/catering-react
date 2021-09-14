// Init
import React, { useState } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

// Importing Components
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import { toast } from "react-toastify";
import Api from "../api/index";
import { UpdateStore } from "../StoreContext";
import { Helmet } from "react-helmet";

// styles
const useStyles = makeStyles({
  container: { position: "relative", height: "100vh" },
  header: { position: "absolute", top: 0, zIndex: 1000 },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
});

// Home Component
export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const updateStore = UpdateStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Input field handle Change
  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  // On submit function
  const handleSubmit = async () => {
    const { email, password } = formData;
    if (email.length < 1) {
      toast.error("Email cannot be empty");
      return;
    }
    if (password.length < 1) {
      toast.error("Password cannot be empty");
      return;
    }
    const { data } = await Api("post", "/api/vendors/login", formData);

    updateStore({ user: data.user });
    localStorage.setItem("token", data.token);
    history.replace("/profile");
  };

  return (
    <div className={classes.container}>
      <Helmet>
        <title>Vendors Login</title>
        <meta
          name="description"
          content="H-Catering is a website to help the Muslims in DMV to find the best catering option for their upcoming event easily !We help muslim business owners to promote their business."
        />
        <meta name="keywords" content="Vendors, Vendors Login Form, Login" />
      </Helmet>

      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.form}>
        <LoginForm
          data={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
