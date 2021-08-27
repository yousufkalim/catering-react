import React from "react";
import { Carousel } from "react-responsive-carousel";
import {
  SliderImage1,
  SliderImage2,
  NextIcon,
  PrevIcon,
} from "../assets/images";

const arrowStyles = {
  position: "absolute",
  zIndex: 5,
  top: "calc(50% - 15px)",
  width: 30,
  height: 30,
  cursor: "pointer",
  background: "none",
  border: "none",
};

const Slider = () => {
  return (
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
            style={{ ...arrowStyles, left: 15 }}
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
            style={{ ...arrowStyles, right: 15 }}
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
        <img src={SliderImage1} alt="img1" style={{ height: "60vh" }} />
      </div>
      <div>
        <img src={SliderImage2} alt="img1" style={{ height: "60vh" }} />
      </div>
    </Carousel>
  );
};

export default Slider;
