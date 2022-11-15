import {
  Backdrop,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import { COLORS } from "../../../../../constants/color";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

interface Props {
  open: boolean;
  handleClose: () => void;
  handlePre: () => void;
  handleNext: () => void;
  source: string;
}

const FullScreenImage: React.FC<Props> = ({
  open,
  source,
  handleClose,
  handleNext,
  handlePre,
}) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <IconButton
        aria-label="delete"
        className={classes.margin}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          color: COLORS.appSecondColor,
        }}
        onClick={handleClose}
      >
        <Close fontSize="large" />
      </IconButton>
      <IconButton
        aria-label="delete"
        className={classes.margin}
        style={{
          position: "absolute",
          left: 0,
          color: COLORS.appSecondColor,
        }}
        onClick={handlePre}
      >
        <KeyboardArrowLeft fontSize="large" />
      </IconButton>
      <img
        src={source}
        alt="room"
        style={{ maxWidth: "80%", height: "100%", objectFit: "contain" }}
      />

      <IconButton
        aria-label="delete"
        className={classes.margin}
        style={{
          position: "absolute",
          right: 0,
          color: COLORS.appSecondColor,
        }}
        onClick={handleNext}
      >
        <KeyboardArrowRight fontSize="large" />
      </IconButton>
    </Backdrop>
  );
};

export default FullScreenImage;
