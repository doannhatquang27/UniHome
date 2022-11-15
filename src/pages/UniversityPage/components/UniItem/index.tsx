import { Link } from "react-router-dom";
import { getNavigationLinkToUniversity } from "../../../../services/utils/university";
import { UniverityItem } from "../UniList";
import "./index.scss";

interface Props {
  university: UniverityItem;
  selected: boolean;
}

const getDistrictOfUniversity = (address: string) => {
  const splitResult = address.split(",");
  return splitResult[splitResult.length - 1];
};

const UniItem: React.FC<Props> = ({ university, selected }) => {
  return (
    <div className="uni-item-container">
      <Link
        to={getNavigationLinkToUniversity(university)}
        className="uni-item-link"
      >
        <div className={selected ? "uni-item uni-item--selected" : "uni-item"}>
          <img
            src={university.image}
            alt={university.name}
            className="uni-item_image"
          />
          <div className="uni-item_info">
            <div className="uni-item_info_name">
              <span>{university.name}</span>
            </div>
            <div className="uni-item_info_address">
              <span>{getDistrictOfUniversity(university.address)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UniItem;
