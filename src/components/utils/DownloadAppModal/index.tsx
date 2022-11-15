import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
} from "@material-ui/core";
import React, { FC } from "react";
import "./index.scss";
import AndroidImage from "../../../assets/images/footer/google-play-logo.png";
import { Close } from "@material-ui/icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DownloadAppModal: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card className="install-app-modal_card">
        <CardHeader
          title="Tải App"
          action={
            <IconButton aria-label="settings" onClick={onClose}>
              <Close className="card-header_icon" />
            </IconButton>
          }
        />
        <CardContent className="install-app-modal_card_content">
          <span>Để đăng phòng ở ghép, mời bạn tải ứng dụng Unihome.</span>
          <span> Hoặc liên hệ đến mail unihomebanana@gmail.com</span>
          <img
            src={AndroidImage}
            alt="Download App On Play Store"
            width="40%"
          />
        </CardContent>
      </Card>
    </Modal>
  );
};

export default DownloadAppModal;
