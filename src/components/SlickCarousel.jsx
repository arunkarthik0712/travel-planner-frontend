import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickCarousel = ({ images }) => {
  if (!Array.isArray(images) || images.length === 0) {
    return <p>No images available</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    arrows: true, // Navigation arrows
  };

  return (
    <div className="carousel-container max-w-md mx-auto my-4">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide p-2">
            <img
              src={image.url} // Extract the URL from the image object
              alt={`Slide ${index}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarousel;
