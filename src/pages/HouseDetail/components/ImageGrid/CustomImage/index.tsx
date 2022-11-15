import React from "react";
import PlaceHolderImage from "../../../../../assets/images/PlaceHolderImage.svg";
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
      style={{ height: isMain ? 402 : 200 }}
      onClick={handleClick}
    >
      <img
        src={source}
        alt="room"
        className="grid-image_image"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = PlaceHolderImage;
        }}
      />

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
