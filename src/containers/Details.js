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
import TransitionsModal from "../components/TransitionsModal";
import MenuModal from "../components/MenuModal";
import ReviewModal from "../components/ReviewModal";

// styles
const useStyles = makeStyles({
  container: { position: "relative" },
  header: { position: "absolute", top: 0, zIndex: 1000, width: "100%" },
  slider: {
    overflow: "hidden",
  },
});

// Home Component
export default function Details() {
  const classes = useStyles();
  const [vendor, setVendor] = useState({});
  const [ratings, setRatings] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const { id } = useParams();

  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleOpenReviews = () => setOpenReviews(true);
  const handleCloseReviews = () => setOpenReviews(false);

  const getVendor = async () => {
    const { data } = await Api("get", `/api/vendors/${id}`);
    setVendor(data.vendor);
    setRatings(data.vendor.ratings);
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
      <Profile
        vendor={vendor}
        handleMenuOpen={handleOpenMenu}
        handleReviewsOpen={handleOpenReviews}
      />
      <Footer />
      <TransitionsModal
        open={openMenu}
        handleClose={handleCloseMenu}
        body={<MenuModal menu={vendor.menu_image} />}
      />

      <TransitionsModal
        open={openReviews}
        handleClose={handleCloseReviews}
        body={<ReviewModal />}
      />
    </div>
  );
}
