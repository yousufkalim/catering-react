// Init
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// Importing Components
import Header from "../components/Header";
import Slider from "../components/Slider";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import Api from "../api/index";
import TransitionsModal from "../components/transitionsModal";
import MenuModal from "../components/menuModal";

// styles
const useStyles = makeStyles({
  container: { position: "relative" },
  header: { position: "absolute", top: 0, zIndex: 1000 },
  slider: {
    overflow: "hidden",
  },
});

// Home Component
export default function Details() {
  const classes = useStyles();
  const [vendor, setVendor] = useState({});
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getVendor = async () => {
    const { data } = await Api("get", `/api/vendors/${id}`);
    setVendor(data.vendor);
  };

  useEffect(() => {
    getVendor();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.slider}>
        <Slider name={vendor.company_name} />
      </div>
      <Profile vendor={vendor} handleMenuOpen={handleOpen} />
      <Footer />
      <TransitionsModal
        open={open}
        handleClose={handleClose}
        body={<MenuModal menu={vendor.menu_image} />}
      />
    </div>
  );
}
