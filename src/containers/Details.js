// Init
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, useMediaQuery } from "@material-ui/core";
import Joi from "joi-browser";
import publicIp from "public-ip";

// Importing Components
import Header from "../components/Header";
import Slider from "../components/Slider";
import Profile from "../components/Profile";
import Footer from "../components/Footer";
import Api from "../api/index";
import TransitionsModal from "../components/TransitionsModal";
import MenuModal from "../components/MenuModal";
import ReviewModal from "../components/ReviewModal";
import AddReviewModal from "../components/AddReviewModal";
import { validate, validateProperty } from "../utils/joiFunctions";
import { Helmet } from "react-helmet";

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
  // States
  const classes = useStyles();
  const [vendor, setVendor] = useState({});
  const [reviews, setReviews] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);
  const [addReview, setAddReviews] = useState(false);
  const [review, setReview] = useState({
    username: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [ratingValue, setRatingValue] = useState(5);
  const matches = useMediaQuery("(max-width:960px)");

  const { id } = useParams();

  // Functions for handling Menu image Modal
  const handleOpenMenu = () => setOpenMenu(true);
  const handleCloseMenu = () => setOpenMenu(false);

  // Functions for handling Ratings modal
  const handleOpenReviews = () => setOpenReviews(true);
  const handleCloseReviews = () => setOpenReviews(false);

  // Functions for handling add Ratings modal
  const handleOpenAddReview = () => {
    setOpenReviews(false);
    setAddReviews(true);
  };
  const handleCloseAddReview = () => {
    setAddReviews(false);
    setOpenReviews(true);
    setReview({
      username: "",
      comment: "",
    });
    setErrors({});
    setRatingValue(5);
  };

  // Getting vendor according to params id on mounting
  const getVendor = async () => {
    const { data } = await Api("get", `/api/vendors/${id}`);
    setVendor(data.vendor);
    setReviews(data.vendor.ratings.reverse());
  };

  useEffect(() => {
    getVendor();
  }, []);

  // Scehma for reviews
  const reviewSchema = {
    username: Joi.string().min(3).required().label("Username"),
    comment: Joi.string().min(6).required().label("Comment"),
  };

  // Reviews handle change function
  const handleChange = ({ target }) => {
    const { name, value } = target;
    const allErrors = { ...errors };
    const errorMessage = validateProperty(name, value, reviewSchema);
    if (errorMessage) allErrors[name] = errorMessage;
    else delete allErrors[name];
    setErrors(allErrors);

    const formData = { ...review };
    formData[name] = value;
    setReview(formData);
  };

  // Rating number change function
  const handleRatingChange = (newRating) => setRatingValue(newRating);

  // On Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = validate(review, reviewSchema);
    setErrors(errors || {});
    if (errors) return;

    const ip = await publicIp.v4();
    const allReviews = [...reviews];
    const localVendor = { ...vendor };
    const { data } = await Api("post", `/api/ratings`, {
      username: review.username,
      comment: review.comment,
      rating: ratingValue,
      vendorId: id,
      ip,
    });

    allReviews.unshift(data.review);
    setReviews(allReviews);

    localVendor.ratings.push(data.review);
    let final_rating = 0;
    localVendor.ratings.forEach((item) => {
      final_rating += item.rating;
    });
    localVendor.final_rating = Math.floor(
      final_rating / localVendor.ratings.length
    );
    setVendor(localVendor);
    handleCloseAddReview();
  };

  return (
    <div className={classes.container}>
      <Helmet>
        <title>{vendor.company_name}</title>
        <meta name="description" content={vendor.description} />
        <meta name="keywords" content={`Vendor, ${vendor.company_name}`} />
      </Helmet>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.slider}>
        <Slider
          details={
            <Typography variant={!matches ? "h3" : "h4"} id="text-animation">
              <b>{vendor.company_name?.toUpperCase()}</b>
            </Typography>
          }
        />
      </div>
      <Profile
        vendor={vendor}
        vendorId={id}
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
        body={
          <ReviewModal
            ratings={reviews}
            handleOpenAddReview={handleOpenAddReview}
          />
        }
      />

      <TransitionsModal
        open={addReview}
        handleClose={handleCloseAddReview}
        body={
          <AddReviewModal
            review={review}
            rating={ratingValue}
            errors={errors}
            handleChange={handleChange}
            handleRatingChange={handleRatingChange}
            handleSubmit={handleSubmit}
          />
        }
      />
    </div>
  );
}
