import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.scss";

interface Props {
  images: string[];
}

const CarouselHouseImage: React.FC<Props> = ({ images }) => {
  const [slides, setSlides] = useState<string[]>(images);

  useEffect(() => {
    setSlides(images);
  }, [images]);

  return (
    <div className="carousel-house">
      <Carousel>
        {slides.map((source, index) => (
          <img
            key={index}
            className="img-example-small"
            src={source}
            alt={source}
            style={{ maxWidth: "100%", maxHeight: 350, objectFit: "contain" }}
            loading="eager"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselHouseImage;
