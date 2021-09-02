//Init
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { HeroImg, MapImg } from "../assets/images";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CatererCard from "./CatererCard";
import { TileLayer, Marker, Popup, Map } from "react-leaflet";

// Styles
const useStyles = makeStyles({
  heroDiv: {
    position: "relative",
    height: "100vh",
    background: `url('${HeroImg}')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  imgOverlay: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  subtitle: { marginTop: "30px" },
  btn: {
    color: "white",
    maxHeight: "40px",
    paddingRight: "20px",
    paddingLeft: "20px",
    marginTop: "100px",
    borderRadius: "10px",
    backgroundColor: "black",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
    },
  },
  caterers: {
    background: "#F9F9F9",
    padding: "40px",
    height: "600px",
    overflowY: "scroll",
  },
  mapBox: {
    height: "600px",
    width: "100%",
    overflow: "hidden",
  },
  cateringArea: { height: "600px" },
});

const Listing = ({ center, vendors }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.heroDiv}>
        <div className={classes.imgOverlay}>
          <Typography variant="h2">
            <b>Find your caterer easily</b>
          </Typography>

          <Typography variant="h5" className={classes.subtitle}>
            <em>Listing of the Halal vendors in your area</em>
          </Typography>

          <Button variant="contained" className={classes.btn}>
            See the Options
          </Button>
        </div>
      </div>

      <Grid container spacing={0} className={classes.cateringArea}>
        <Grid item xs={12} sm={5} className={classes.caterers}>
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Caterers in DMV area
          </Typography>
          <Grid container spacing={2}>
            {vendors.length > 0 ? (
              vendors.map((item) => (
                <Grid item xs={12} md={6}>
                  <CatererCard vendor={item} />
                </Grid>
              ))
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
        <Grid
          item
          xs={12}
          sm={7}
          style={{ height: "600px", width: "100%", overflow: "hidden" }}
        >
          <Map center={center} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={[31.369693000000001, 74.27284610000005]}>
              <Popup>A pretty CSS3 popup.</Popup>
            </Marker>
          </Map>
        </Grid>
      </Grid>
    </div>
  );
};

export default Listing;
