import React from "react";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  SliderImage1,
  SliderImage2,
  NextIcon,
  PrevIcon,
} from "../assets/images";

const useStyles = makeStyles({
  img: { width: "100%", height: "80vh", objectFit: "cover" },
  container: { position: "relative" },
  arrows: {
    position: "absolute",
    zIndex: 5,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
    background: "none",
    border: "none",
  },
  headingDiv: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});

const Slider = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Carousel
        infiniteLoop
        emulateTouch
        swipeable
        dynamicHeight
        stopOnHover
        autoPlay
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className={classes.arrows}
              style={{ left: 15 }}
            >
              <img
                src={PrevIcon}
                alt="prev"
                title={label}
                onClick={onClickHandler}
              />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className={classes.arrows}
              style={{ right: 15 }}
            >
              <img
                src={NextIcon}
                alt="prev"
                title={label}
                onClick={onClickHandler}
              />
            </button>
          )
        }
      >
        <div>
          <img src={SliderImage1} alt="img1" className={classes.img} />
        </div>
        <div>
          <img src={SliderImage2} alt="img2" className={classes.img} />
        </div>
      </Carousel>

      <div className={classes.headingDiv}>
        <Typography variant="h3">
          <b>{name?.toUpperCase()}</b>
        </Typography>
      </div>
    </div>
  );
};

export default Slider;
