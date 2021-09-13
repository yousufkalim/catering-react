//Init
import React from "react";
import L from "leaflet";
import { TileLayer, Marker, Map } from "react-leaflet";
import MuiSelect from "./MuiSelect";
import {
  HeroImg,
  UserMarker,
  VendorMarker,
  SelectedVendor,
} from "../assets/images";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CatererCard from "./CatererCard";
import { Store } from "../StoreContext";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Styles
const useStyles = makeStyles((theme) => ({
  caterers: {
    background: "#F9F9F9",
    padding: "40px",
    height: "100vh",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#303f9f",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#303f9f",
    },
  },
  mapBox: {
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  cateringArea: { height: "100vh" },
  loadBtn: {
    margin: "auto",
    color: "black",
    marginTop: "10px",
  },
  catererHeading: { color: theme.palette.primary.dark },
}));

const Listing = ({
  center,
  vendors,
  filters,
  selectedVendor,
  handleMarkerClick,
  handlePagination,
  handleFilterChange,
}) => {
  const classes = useStyles();

  const userIcon = L.icon({ iconUrl: UserMarker });
  const vendorIcon = L.icon({ iconUrl: VendorMarker });
  const selecredVendorIcon = L.icon({ iconUrl: SelectedVendor });
  const { vendors: allVendors } = Store();
  const matches = useMediaQuery("(max-width:960px)");

  return (
    <div>
      <Grid
        container
        spacing={0}
        className={classes.cateringArea}
        id="caterersList"
      >
        {matches && (
          <Grid
            item
            xs={12}
            md={7}
            style={{ height: "100vh", width: "100%", overflow: "hidden" }}
          >
            <Map
              center={[center.lat, center.lng]}
              zoom={12}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[center.lat, center.lng]} icon={userIcon} />
              {allVendors.length > 0 &&
                allVendors.map((item) => (
                  <Marker
                    key={item._id}
                    position={[item.address.lat, item.address.lng]}
                    icon={
                      selectedVendor === item._id
                        ? selecredVendorIcon
                        : vendorIcon
                    }
                    onClick={() => handleMarkerClick(item._id)}
                  />
                ))}
            </Map>
          </Grid>
        )}
        <Grid item xs={12} md={5} className={classes.caterers}>
          <Typography
            variant="h4"
            // color="primary"
            className={classes.catererHeading}
            style={{ marginBottom: "10px" }}
          >
            Caterers in DMV area
          </Typography>
          <Grid container spacing={2}>
            <Grid container spacing={1} style={{ padding: "10px" }}>
              <Grid item xs={12} lg={3}>
                <MuiSelect
                  label="Restaurant type"
                  name="restaurant_type"
                  value={filters["restaurant_type"]}
                  handleChange={handleFilterChange}
                  data={[
                    { _id: 1, value: "Desi", label: "Desi" },
                    { _id: 2, value: "Mediteranean", label: "Mediteranean" },
                    { _id: 3, value: "Chinese/Thai", label: "Chinese/Thai" },
                    { _id: 4, value: "Mexican", label: "Mexican" },
                    { _id: 5, value: "American", label: "American" },
                    { _id: 6, value: "African", label: "African" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} lg={2}>
                <MuiSelect
                  label={"Price"}
                  name="price"
                  value={filters["price"]}
                  handleChange={handleFilterChange}
                  data={[
                    { _id: 1, value: "500", label: "0 - 500" },
                    { _id: 2, value: "1000", label: "500 - 1000" },
                    { _id: 3, value: "2000", label: "1000 - 2000" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <MuiSelect
                  label={"Delivery Options"}
                  name="is_delivering"
                  value={filters["is_delivering"]}
                  handleChange={handleFilterChange}
                  data={[
                    { _id: 1, value: "true", label: "Yes" },
                    { _id: 2, value: "false", label: "No" },
                  ]}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <MuiSelect
                  label={"Dine-in Options"}
                  name="dine_in_options"
                  value={filters["dine_in_options"]}
                  handleChange={handleFilterChange}
                  data={[
                    { _id: 1, value: "true", label: "Yes" },
                    { _id: 2, value: "false", label: "No" },
                  ]}
                />
              </Grid>
            </Grid>

            {vendors.length > 0 ? (
              <>
                <Grid container spacing={2}>
                  {vendors.map((item) => (
                    <Grid item xs={12} md={6} key={item._id}>
                      <CatererCard
                        vendor={item}
                        selectedVendor={selectedVendor}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Button
                  color="primary"
                  className={classes.loadBtn}
                  onClick={handlePagination}
                >
                  Load More
                </Button>
              </>
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ marginTop: "10px", marginLeft: "6px" }}
                >
                  No Vendors in you area
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        {!matches && (
          <Grid
            item
            xs={12}
            md={7}
            style={{ height: "100vh", width: "100%", overflow: "hidden" }}
          >
            <Map
              center={[center.lat, center.lng]}
              zoom={12}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[center.lat, center.lng]} icon={userIcon} />
              {allVendors.length > 0 &&
                allVendors.map((item) => (
                  <Marker
                    key={item._id}
                    position={[item.address.lat, item.address.lng]}
                    icon={
                      selectedVendor === item._id
                        ? selecredVendorIcon
                        : vendorIcon
                    }
                    onClick={() => handleMarkerClick(item._id)}
                  />
                ))}
            </Map>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Listing;
