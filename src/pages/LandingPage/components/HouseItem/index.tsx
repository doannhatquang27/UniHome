import {
  Button,
  Chip,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { getNavigationLinkToHouseDetail } from "../../../../services/utils/navigation";
import PlaceHolderImage from "../../../../assets/images/PlaceHolderImage.svg";
import "./index.scss";
import { HouseTypeEnum } from "../../../HomePage/components/Main/HouseCard";
import { COLORS } from "../../../../constants/color";

interface Props {
  house: IHouse;
}

const HouseItem: React.FC<Props> = ({ house }) => {
  const classes = useStyles();

  const numberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="rent-item">
      <div className="rent-item_image--block">
        <img
          src={house.image}
          alt={house.name}
          className="rent-item_image--block_img"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = PlaceHolderImage;
          }}
        />
      </div>

      <a
        className="rent-item_image"
        href={getNavigationLinkToHouseDetail(house)}
      >
        <div
          style={{
            backgroundImage: `url(${house.image}), url(${PlaceHolderImage})`,
          }}
          className="rent-item_image_background"
        />
      </a>

      {/* Info */}
      <div
        style={{
          display: "flex",
          flex: 3,
          flexDirection: "column",
          minHeight: "30vh",
        }}
      >
        <div className="rent-item_info">
          <div className="name-and-price">
            <a href={getNavigationLinkToHouseDetail(house)} className="name">
              <span>{house.name}</span>
            </a>
          </div>

          <span className="address-content">
            {house.wardName}, {house.districtName}
          </span>

          <Grid container>
            <Grid item xs={6}>
              <span className="content">
                {house.houseTypeId === HouseTypeEnum.Apartment ? (
                  <i
                    className="las la-building icon-small icon"
                    // style={{ color: COLORS.appMainColor }}
                  />
                ) : (
                  <i
                    className="las la-home icon"
                    // style={{ color: COLORS.appMainColor }}
                  />
                )}
                <span>&nbsp;&nbsp;{house.houseTypeName}</span>
              </span>
            </Grid>
            <Grid item xs={6}>
              <span className="content">
                <i className="las la-expand-arrows-alt icon" />
                <span>&nbsp;&nbsp;Từ {house.minArea} m&#178;</span>
              </span>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 5 }}>
              <div className={classes.root}>
                {house.hasSharing && (
                  <Chip label="Ở ghép" classes={{ root: classes.chipRoot }} />
                )}
                {house.rentTypes.map((item, index) => (
                  <Chip
                    key={index}
                    label={item.name}
                    classes={{ root: classes.chipRoot }}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
        {/* <div style={{ marginLeft: 8 }}>
          <Divider />
        </div> */}
        <div className="card-footer">
          <div className="price-and-detail" style={{ height: "5vh" }}>
            <div className="price-container">
              <span>Từ&nbsp;&nbsp;</span>
              <span className="price">{numberWithCommas(house.minPrice)}đ</span>
              <span className="month">/tháng</span>
            </div>
            <Button
              variant="outlined"
              size="small"
              href={getNavigationLinkToHouseDetail(house)}
              className="button"
            >
              Chi tiết
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseItem;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
    chipRoot: {
      backgroundColor: COLORS.appSecondColor,
      borderRadius: 4,
    },
  })
);
