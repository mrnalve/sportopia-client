import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../public/banner1.jpg";
import banner2 from "../../../public/banner2.jpg";
import banner3 from "../../../public/banner3.jpg";
import banner4 from "../../../public/banner4.jpg";
import { Toaster } from "react-hot-toast";
import { Fade, Slide } from "react-awesome-reveal";

const Banner = () => {
  return (
    <Carousel>
      <div className="h-[750px] relative">
        <img className="h-full" src={banner1} alt="" />
        <div className="banner-style">
          <div className="banner-content-style">
          <Slide damping={1e-1}>
              <h1 className="text-5xl geologica font-bold">
                Unleash Your Potential in the World of Sports
              </h1>
            </Slide>

            <Slide damping={1e-1}>
              <p className="font-normal roboto">
                Discover a world of endless possibilities at Sportopia. Elevate
                your skills, embrace new challenges, and redefine your limits.
                Join us and embark on a remarkable sporting journey today.
              </p>
            </Slide>
            <Slide damping={1e-1}>
            <div>
              <button className="btn btn-grad text-white">
                Explore Courses
              </button>
            </div>
            </Slide>
          </div>
        </div>
      </div>
      <div className="h-[750px] relative">
        <img className="h-full" src={banner2} alt="" />
        <div className="banner-style">
          <div className="banner-content-style">
            <h1 className="text-5xl geologica font-bold">
              Unleash Your Potential in the World of Sports
            </h1>
            <p className="font-normal roboto">
              Discover a world of endless possibilities at Sportopia. Elevate
              your skills, embrace new challenges, and redefine your limits.
              Join us and embark on a remarkable sporting journey today.
            </p>
            <div>
              <button className="btn btn-grad text-white">
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[750px] relative">
        <img className="h-full" src={banner3} alt="" />
        <div className="banner-style">
          <div className="banner-content-style">
            <h1 className="text-5xl geologica font-bold">
              Unleash Your Potential in the World of Sports
            </h1>
            <p className="font-normal roboto">
              Discover a world of endless possibilities at Sportopia. Elevate
              your skills, embrace new challenges, and redefine your limits.
              Join us and embark on a remarkable sporting journey today.
            </p>
            <div>
              <button className="btn btn-grad text-white">
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[750px] relative">
        <img className="h-full" src={banner4} alt="" />
        <div className="banner-style">
          <div className="banner-content-style">
            <Slide>
              <h1 className="text-5xl geologica font-bold">
                Unleash Your Potential in the World of Sports
              </h1>
            </Slide>

            <Fade delay={1e3} cascade damping={1e-1}>
              <p className="font-normal roboto">
                Discover a world of endless possibilities at Sportopia. Elevate
                your skills, embrace new challenges, and redefine your limits.
                Join us and embark on a remarkable sporting journey today.
              </p>
            </Fade>
            <div>
              <button className="btn btn-grad text-white">
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
