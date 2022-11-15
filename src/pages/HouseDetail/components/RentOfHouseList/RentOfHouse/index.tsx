import {
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { FC, useState } from "react";
import PlaceHolderImage from "../../../../../assets/images/PlaceHolderImage.svg";
import { Gender } from "../../../../../enums/EnumGender";
import IRentEntity from "../../../../../interfaces/UniHouseApiInterfaces/IRentEntity";
import RentModal from "../../RentModal";

interface Props {
  rent: IRentEntity;
}

const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const renderGender = (gender: Gender) => {
  switch (gender) {
    case Gender.all:
      return (
        <React.Fragment>
          <span className="las la-user-friends icon" />
          <span>&nbsp;1-2 người (nam, nữ)</span>
        </React.Fragment>
      );
    case Gender.male:
      return (
        <React.Fragment>
          <span className="las la-user-friends icon" />
          <span>&nbsp;1-2 người (nam)</span>
        </React.Fragment>
      );
    case Gender.female:
      return (
        <React.Fragment>
          <span className="las la-user-friends icon" />
          <span>&nbsp;1-2 người (nữ)</span>
        </React.Fragment>
      );
  }
};

const RentOfHouse: FC<Props> = ({ rent }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper
        className="house-card-new"
        classes={{ rounded: classes.rounded }}
        style={{ cursor: "pointer" }}
        onClick={() => setToggleModal(true)}
      >
        <div className="card-content">
          <div className="link">
            {rent.image ? (
              <div className="media">
                <img
                  alt="house"
                  className="media_image"
                  src={rent.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = PlaceHolderImage;
                  }}
                />
                {rent.image && rent.isSharing && (
                  <div className="media_label">
                    <span>Tìm ở ghép</span>
                  </div>
                )}
              </div>
            ) : null}
            <div className="house-info">
              <div className="house-info__house-name">
                <Typography
                  variant="subtitle1"
                  component="p"
                  className="house-info__house-name__text"
                >
                  {rent.name}
                </Typography>
              </div>

              <Grid container>
                <Grid item xs={8}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className="house-item"
                  >
                    <span className="las la-home icon-small icon" />
                    <span>&nbsp;{rent.rentType.name}</span>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle2"
                    component="p"
                    className="house-item"
                  >
                    <span className="las la-expand-arrows-alt icon-small icon" />
                    <span>&nbsp;{rent.area} m&#178;</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className="house-item"
                  >
                    {renderGender(rent.gender)}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>

          <Divider />
          <div className="house-footer">
            <div>
              <Typography
                variant="subtitle1"
                component="p"
                className="house-info__address"
              >
                Giá phòng
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span className="house-footer_price">
                  {numberWithCommas(rent.price)} VNĐ&nbsp;
                </span>
                / tháng
              </Typography>
            </div>
            {/* <div
              style={{
                display:
                  currentUser &&
                  (currentUser.userId === house.ownerId ||
                    currentUser.userId === house.createdBy)
                    ? "none"
                    : "block",
              }}
            >
              <Button
                classes={{ root: classes.buttonRoot }}
                className="contact-button"
                variant="contained"
                size="small"
                disableElevation
                onClick={openDrawer}
              >
                Liên hệ
              </Button>
            </div> */}
          </div>
        </div>
      </Paper>
      <RentModal
        rentEntity={rent}
        open={toggleModal}
        onClose={() => setToggleModal(false)}
      />
    </React.Fragment>
  );
};

export default RentOfHouse;

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
