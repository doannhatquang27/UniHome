import {
  Button,
  createStyles,
  DialogProps,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { RentEntityEnum } from "../../../../../enums/RentEntityEnum";
import IHouse from "../../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { getNavigationLinkToHouseDetail } from "../../../../../services/utils/navigation";
import CancelDialog from "./CancelDialog";
import "./index.scss";

interface Props {
  house: IHouse;
  reloadPage: () => void;
}

const SharingCard: React.FC<Props> = ({ house, reloadPage }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    reloadPage();
    setOpen(false);
  };

  const statusName = (status: number) => {
    switch (status) {
      case RentEntityEnum.Rejected:
        return (
          <Typography
            variant="subtitle1"
            color="error"
            display="inline"
            gutterBottom
          >
            Hủy bỏ
          </Typography>
        );
      case RentEntityEnum.Pending:
        return (
          <Typography
            variant="subtitle1"
            style={{ color: "rgb(255, 163, 50)" }}
            display="inline"
            gutterBottom
          >
            Đang chờ xác thực
          </Typography>
        );
      case RentEntityEnum.Available:
        return (
          <Typography
            variant="subtitle1"
            style={{ color: "rgb(255, 163, 50)" }}
            display="inline"
            gutterBottom
          >
            Đã xác thực
          </Typography>
        );
      case RentEntityEnum.Rented:
        return (
          <Typography
            variant="subtitle1"
            style={{ color: "rgb(255, 163, 50)" }}
            display="inline"
            gutterBottom
          >
            Đã được thuê
          </Typography>
        );
      case RentEntityEnum.Unavailable:
        return (
          <Typography
            variant="subtitle1"
            style={{ color: "rgb(255, 163, 50)" }}
            display="inline"
            gutterBottom
          >
            Không có sẵn
          </Typography>
        );
      default:
        return (
          <Typography
            variant="subtitle1"
            style={{ color: "rgb(60, 192, 50)" }}
            display="inline"
            gutterBottom
          >
            Chưa xác định
          </Typography>
        );
    }
  };

  return (
    <React.Fragment>
      <Paper className="house-card-new" classes={{ rounded: classes.rounded }}>
        <div className="card-content">
          <Link to={getNavigationLinkToHouseDetail(house)} className="link">
            {house.image ? (
              <img alt="house" className="media" src={house.image} />
            ) : null}
            <div className="house-info" style={{ padding: "8px 16px" }}>
              <div className="house-info__house-name">
                <Typography
                  variant="subtitle1"
                  component="p"
                  className="house-info__house-name__text"
                >
                  {house.name}
                </Typography>
              </div>

              <Typography
                variant="subtitle2"
                component="p"
                className="house-info__address"
              >
                <span className="address">{house.fullAddress}</span>
              </Typography>

              <Grid container>
                <Grid item xs={8}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className="house-item"
                  >
                    <span className="las la-home icon-small icon" />
                    <span>&nbsp;{house.houseTypeName}</span>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    className="house-item"
                  >
                    <span className="las la-expand-arrows-alt icon-small icon" />
                    <span>&nbsp;{house.minArea} m&#178;</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    className="house-item"
                  >
                    <span className="las la-expand-arrows-alt icon-small icon" />
                    <span>&nbsp;{statusName(house.status)}</span>
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Link>

          <Divider />
          <div className="house-footer" style={{ padding: "8px 16px" }}>
            {/* <div>
              <Typography
                variant="subtitle1"
                component="p"
                className="house-info__address"
              >
                Ngày đăng
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span className="house-footer_price">
                  {format(
                    new Date(rentEntity.createdTime.split("T")[0]),
                    "dd-MM-yyyy"
                  )}
                </span>
                / tháng
              </Typography>
            </div> */}
            <div>
              <Button
                classes={{ root: classes.buttonRoot }}
                className="remove-button"
                variant="text"
                size="small"
                disableElevation
                onClick={() => handleClickOpen("paper")}
              >
                Hủy bỏ
              </Button>
            </div>
          </div>
        </div>
      </Paper>
      <CancelDialog
        open={open}
        handleClose={handleClose}
        scroll={scroll}
        houseId={house.houseId}
      />
    </React.Fragment>
  );
};

export default SharingCard;

const useStyles = makeStyles(() =>
  createStyles({
    rounded: {
      borderRadius: 4,
    },
    buttonRoot: {
      borderRadius: 4,
    },
  })
);
