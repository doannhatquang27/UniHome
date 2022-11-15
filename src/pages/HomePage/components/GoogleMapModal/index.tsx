import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import "./index.scss";

interface Props {
  house: IHouse;
  open: boolean;
  onClose: () => void;
}

const convertAddress = (name: string) => {
  const replaceBlankSpace = name.replace(" ", "+");
  const replaceSlash = replaceBlankSpace.replace("/", ",+");
  return replaceSlash;
};

const GoogleMapModal: React.FC<Props> = ({ house, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card className="map-model-card">
        <CardHeader
          title="Bản đồ"
          action={
            <IconButton aria-label="settings" onClick={onClose}>
              <Close className="card-header_icon" />
            </IconButton>
          }
          className="card-header"
        />
        <CardContent className="card-content">
          <iframe
            title="google-map-unihome"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBCxnRkV-ZX-30B2a9_B2jZSHe6xN2J3CA&q=${convertAddress(
              house.fullAddress
            )}&zoom=16`}
            allowFullScreen
          ></iframe>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default GoogleMapModal;
