import React from "react";
import "../index.scss";

interface CustomImageProps {
  source: string;
  isMain?: true;
  isMore?: true;
  more?: number;
  handleToggle: () => void;
  handleChangeUrl: () => void;
}

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  isMain,
  isMore,
  more,
  handleToggle,
  handleChangeUrl,
}) => {
  const handleClick = () => {
    handleChangeUrl();
    handleToggle();
  };

  return (
    <div
      className="grid-image_container"
      style={{ height: isMain ? 500 : 250 }}
      onClick={handleClick}
    >
      <img src={source} alt="room" className="grid-image_image" />

      {isMore && (
        <React.Fragment>
          <div className="grid-image--black-background"></div>
          <div className="grid-image_plus-number">+{more}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CustomImage;
