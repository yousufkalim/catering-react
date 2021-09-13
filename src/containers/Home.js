// Init
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import axios from "axios";

// Importing Components
import Header from "../components/Header";
import Listing from "../components/Listing";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import Api from "../api/index";
import { UpdateStore, Store } from "../StoreContext";
import TransitionsModal from "../components/TransitionsModal";
import LocationMdoal from "../components/LocationModal";
import { Button } from "@material-ui/core";
import AnchorLink from "react-anchor-link-smooth-scroll";

// Styles
const useStyles = makeStyles((theme) => ({
  container: { position: "relative" },
  header: { position: "absolute", top: 0, zIndex: 1000, width: "100%" },
  footNoteBtn: { marginLeft: "10px", color: "lightBlue", cursor: "pointer" },
  footNote: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    padding: "20px",
    zIndex: "10000",
    color: "white",
    textAlign: "center",
  },
  slider: { overflow: "hidden" },
  btn: {
    color: "white",
    maxHeight: "40px",
    padding: "20px",
    marginTop: "70px",
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.primary.dark,
    },
  },
  subtitle: { marginTop: "30px" },
}));

// Home Component
export default function Home() {
  const classes = useStyles();
  const [location, setlocation] = useState({ lat: 50.2276, lng: 2.2137 });
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [allAddresses, setAllAddresses] = useState([]);
  const [address, setAddress] = useState({
    label: "",
    lat: "",
    lng: "",
  });
  const [locationModal, setLocationModal] = useState(false);
  const [footNote, setFootNote] = useState(true);
  const [filters, setFilters] = useState({
    price: "",
    is_delivering: "",
    dine_in_options: "",
    restaurant_type: "",
    lower_price: "",
  });
  const updateStore = UpdateStore();
  const { vendors: allVendors } = Store();
  const placesApiKey = process.env.REACT_APP_GOOGLE_PLACES_KEY;

  useEffect(() => {
    getUserLocation();
    setTimeout(() => {
      setFootNote(false);
    }, 10000);
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setlocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        getFilteredVendors({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        const localAddress = JSON.parse(localStorage.getItem("address"));
        if (localAddress) {
          setlocation({
            lat: localAddress[0],
            lng: localAddress[1],
          });
          getFilteredVendors({
            lat: localAddress[0],
            lng: localAddress[1],
          });
        } else {
          setLocationModal(true);
        }
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

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
    const {
      lower_price,
      price,
      is_delivering,
      dine_in_options,
      restaurant_type,
    } = filters;
    const { name, value } = target;
    const allFilters = { ...filters };
    let lower_range = "",
      upper_range = "";

    if (name === "price") {
      if (value.trim().length < 1) {
        allFilters.price = "";
        allFilters.lower_price = "";
      }
      if (value.trim() === "500") {
        allFilters.lower_price = 0;
        allFilters.price = 500;
        lower_range = 0;
        upper_range = 500;
      }
      if (value.trim() === "1000") {
        allFilters.lower_price = 500;
        allFilters.price = 1000;
        lower_range = 500;
        upper_range = 1000;
      }
      if (value.trim() === "2000") {
        allFilters.lower_price = 1000;
        allFilters.price = 2000;
        lower_range = 1000;
        upper_range = 2000;
      }
      setFilters(allFilters);
    }

    if (name !== "price") {
      allFilters[name] = value.trim();
      setFilters(allFilters);
    }

    const { data } = await Api(
      "get",
      `/api/vendors/filtered-vendors?upper_range=${
        name === "price" ? upper_range : price
      }&lower_range=${
        name === "price" ? lower_range : lower_price
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

  const handleGetAddress = async ({ target }) => {
    // delete axios.defaults.headers.common["x-auth-token"];
    // const { data } = await axios.get(
    //   `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${target.value}&inputtype=textquery&fields=formatted_address,name,geometry&key=${placesApiKey}`
    // );
    // axios.defaults.headers.common["x-auth-token"] = localStorage.setItem(
    //   "token",
    //   localStorage.getItem("token")
    // );
    // setAllAddresses(data.candidates);

    const { data } = await Api("get", `/api/places?name=${target.value}`);
    setAllAddresses(data.places);
  };

  const handleAddressChange = async ({ target }) => {
    if (target.textContent) {
      const index = allAddresses.findIndex(
        (a) => a.formatted_address === target.textContent
      );
      setAddress({
        label: allAddresses[index].formatted_address,
        lat: allAddresses[index].geometry?.location?.lat,
        lng: allAddresses[index].geometry?.location?.lng,
      });
    } else {
      setAddress({
        label: "",
        lat: "",
        lng: "",
      });
    }
  };

  const handleSubmit = () => {
    if (address.label.length < 1) {
      toast.error("Select Address or enable location");
    } else {
      setlocation({
        lat: address.lat,
        lng: address.lng,
      });
      getFilteredVendors({
        lat: address.lat,
        lng: address.lng,
      });

      localStorage.setItem(
        "address",
        JSON.stringify([address.lat, address.lng])
      );

      setLocationModal(false);
    }
  };

  const renderSliderContent = () => {
    return (
      <div style={{ textAlign: "center" }} id="text-animation">
        <Typography variant="h2">
          <b>Find your caterer easily</b>
        </Typography>

        <Typography variant="h5" className={classes.subtitle}>
          <em>Listing of the Halal vendors in your area</em>
        </Typography>

        <Button variant="contained" className={classes.btn}>
          <AnchorLink
            href="#caterersList"
            style={{ textDecoration: "none", color: "white" }}
          >
            See the Options
          </AnchorLink>
        </Button>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.slider}>
        <Slider
          name={"vendor.company_name"}
          home={true}
          details={renderSliderContent()}
        />
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
      <TransitionsModal
        open={locationModal}
        hideCross={true}
        body={
          <LocationMdoal
            allAddresses={allAddresses}
            handleSubmit={handleSubmit}
            handleGetAddress={handleGetAddress}
            handleAddressChange={handleAddressChange}
          />
        }
      />

      {footNote && (
        <div className={classes.footNote}>
          <Typography variant="body1">
            <b>
              Your location has been set automatically If you want to change it.
              <span
                className={classes.footNoteBtn}
                onClick={() => setLocationModal(true)}
              >
                Click Here
              </span>
            </b>
          </Typography>
        </div>
      )}
    </div>
  );
}
