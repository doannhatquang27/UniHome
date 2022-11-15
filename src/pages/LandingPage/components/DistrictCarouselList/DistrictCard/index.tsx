import { FC } from "react";
import { Link } from "react-router-dom";
import { DistrictItem } from "..";

const handleViewDistrict = (
  districtName: string,
  districtMapping: DistrictItem[]
) => {
  const districtId = districtMapping.find(
    (item) => item.name === districtName
  )!.districtId;
  return `/home?districtId=${districtId}`;
};

interface Props {
  districtItem: DistrictItem;
  districtMapping: DistrictItem[];
}

const DistrictCard: FC<Props> = ({ districtItem, districtMapping }) => {
  return (
    <Link to={handleViewDistrict(districtItem.name, districtMapping)}>
      <div
        style={{
          height: 300,
          // backgroundImage: `url(${districtItem.districtImage})`,
          // backgroundSize: "cover"
        }}
      >
        <img src={districtItem.districtImage} alt={districtItem.name} />
        <div className="item_name">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <span>{districtItem.name}</span>
          </div>
          <br />
        </div>
      </div>
    </Link>
  );
};

export default DistrictCard;
