import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomCarousel = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="relative">
      {slides.map((slide, index) => (
        <div key={index} className="relative h-[500px]">
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center">
            <h2 className="text-white text-4xl font-bold">{slide.title}</h2>
            {slide.subtitle && (
              <p className="text-white text-lg mt-2">{slide.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CustomCarousel;
