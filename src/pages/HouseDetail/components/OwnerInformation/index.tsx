import { Button, createStyles, makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import "./index.scss";

interface Props {
  house: IHouse | undefined;
}

const OwnerInformation: React.FC<Props> = ({ house }) => {
  const [isShow, setIsShow] = useState(false);
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span className="title">Thông tin người đăng</span>
      {/* avatar */}
      <div className="owner-info" style={{ display: "flex" }}>
        <div>
          {house && house.creatorAvatar ? (
            <Avatar
              alt="Remy Sharp"
              src={house.creatorAvatar}
              className="avatar"
            />
          ) : (
            <Avatar
              alt="Remy Sharp"
              src="https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png"
              className="avatar"
            />
          )}
          {/* <Avatar
            alt="Remy Sharp"
            src="https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png"
            className="avatar"
          /> */}
        </div>
        <div className="owner-infor">
          <span>{house && house.ownerName}</span>
          {/* <span>Phone: {house && house.ownerPhone}</span> */}
        </div>
      </div>

      {/* <Divider /> */}
      <div className="contact">
        <Button
          classes={{ root: classes.buttonRoot }}
          variant="contained"
          color="primary"
          disableElevation
          className="button"
          size="large"
          onClick={() => setIsShow(!isShow)}
        >
          {isMobile && house ? (
            <a
              href={`tel:${house.ownerPhone}`}
              style={{ textDecoration: "none", color: "white " }}
            >
              Liên hệ người đăng
            </a>
          ) : isShow ? (
            house && house.ownerPhone
          ) : (
            "Liên hệ người đăng"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OwnerInformation;

const useStyles = makeStyles(() =>
  createStyles({
    buttonRoot: {
      borderRadius: 4,
    },
  })
);
