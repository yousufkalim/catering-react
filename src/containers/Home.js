// Init
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Importing Components
import Header from "../components/Header";
import Listing from "../components/Listing";
import Footer from "../components/Footer";
import Api from "../api/index";
import { UpdateStore, Store } from "../StoreContext";

// Styles
const useStyles = makeStyles({
  container: { position: "relative" },
  header: { position: "absolute", top: 0, zIndex: 1000, width: "100%" },
});

// Home Component
export default function Home() {
  const classes = useStyles();
  const [location, setlocation] = useState({ lat: 50.2276, lng: 2.2137 });
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    price: "",
    is_delivering: "",
    dine_in_options: "",
    restaurant_type: "",
  });
  const updateStore = UpdateStore();
  const { vendors: allVendors } = Store();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setlocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
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
    const { price, is_delivering, dine_in_options, restaurant_type } = filters;
    const { data } = await Api(
      "get",
      `/api/vendors/filtered-vendors?price=${price}&is_delivering=${is_delivering}&dine_in_options=${dine_in_options}&restaurant_type=${restaurant_type}&lat=${lat}&lng=${lng}`
    );
    setSelectedVendor("");
    updateStore({ vendors: data.vendors });
    setVendors(data.vendors.slice(0, pageSize));
  };

  const handleMarkerClick = (_id) => {
    setSelectedVendor(_id);
    let localVendors = [...allVendors];
    const index = localVendors.findIndex((v) => v._id === _id);
    localVendors = [
      localVendors[index],
      ...localVendors.filter((item) => item._id !== _id),
    ];
    setPageSize(10);
    updateStore({ vendors: localVendors });
    setVendors(localVendors.slice(0, 10));
  };

  const handleFilterChange = async ({ target }) => {
    const { price, is_delivering, dine_in_options, restaurant_type } = filters;
    const { name, value } = target;
    const allFilters = { ...filters };

    allFilters[name] = value.trim();
    setFilters(allFilters);
    const { data } = await Api(
      "get",
      `/api/vendors/filtered-vendors?price=${
        name === "price" ? value.trim() : price
      }&is_delivering=${
        name === "is_delivering" ? value.trim() : is_delivering
      }&dine_in_options=${
        name === "dine_in_options" ? value.trim() : dine_in_options
      }&restaurant_type=${
        name === "restaurant_type" ? value.trim() : restaurant_type
      }&lat=${location.lat}&lng=${location.lng}`
    );
    setSelectedVendor("");
    updateStore({ vendors: data.vendors });
    setVendors(data.vendors.slice(0, pageSize));
  };

  const handlePagination = () => {
    setPageSize(pageSize + 10);
    setVendors(allVendors.slice(0, pageSize + 10));
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div>
        <Listing
          center={location}
          vendors={vendors}
          selectedVendor={selectedVendor}
          filters={filters}
          handleMarkerClick={handleMarkerClick}
          handlePagination={handlePagination}
          handleFilterChange={handleFilterChange}
        />
      </div>

      <Footer />
    </div>
  );
}
