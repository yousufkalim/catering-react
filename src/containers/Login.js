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

  const handleChange = async ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

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
    await Api("post", "/api/vendors/login", formData);
    const { data: auth } = await Api("get", "/api/vendors/check-auth");

    updateStore({ user: auth.user });
    history.replace("/profile");
  };

  return (
    <div className={classes.container}>
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
