import React from "react";
import { Carousel } from "react-responsive-carousel";
import { SliderImage1, SliderImage2 } from "../assets/images";

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
