// Init
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Importing Components
import Header from "../components/Header";
import Listing from "../components/Listing";
import Footer from "../components/Footer";
import Api from "../api/index";

// Styles
const useStyles = makeStyles({
  container: { position: "relative" },
  header: { position: "absolute", top: 0, zIndex: 1000, width: "100%" },
});

// Home Component
export default function Home() {
  const classes = useStyles();
  const [location, setlocation] = useState([46.2276, 2.2137]);
  const [vendors, setVendors] = useState([]);
  const [price, setPrice] = useState("");
  const [isDelivering, setIsDelivering] = useState("");
  const [dineInOptions, setDineInOptions] = useState("");
  const [restaurantType, setRestaurantType] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setlocation([position.coords.latitude, position.coords.longitude]);
        getFilteredVendors({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  const getFilteredVendors = async ({ lat, lng }) => {
    const { data } = await Api(
      "get",
      `/api/vendors/filtered-vendors?price=${price}&is_delivering=${isDelivering}&dine_in_options=${dineInOptions}&restaurant_type=${restaurantType}&lat=${lat}&lng=${lng}`
    );
    setVendors(data.vendors);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div>
        <Listing center={location} vendors={vendors} />
      </div>

      <Footer />
    </div>
  );
}
