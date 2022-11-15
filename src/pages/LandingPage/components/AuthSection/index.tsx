import {
  Avatar,
  Chip,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useHistory } from "react-router";
import LoginButton from "../../../../components/utils/LoginButton";
import IUser from "../../../../interfaces/UniHouseApiInterfaces/IUser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chipRoot: {
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#D4EBDB",
      },
    },
    chipLabel: {
      fontSize: 16,
      [theme.breakpoints.down("sm")]: {
        fontSize: "unset",
      },
    },
    root: {
      display: "inline-block",
      width: "max-content",
    },
  })
);

interface Props {
  currentUser: IUser | null;
}

const AuthSection: React.FC<Props> = ({ currentUser }) => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className={classes.root}>
      {currentUser ? (
        <Chip
          variant="default"
          classes={{ root: classes.chipRoot, label: classes.chipLabel }}
          avatar={<Avatar src={currentUser.image} />}
          label={currentUser.fullname}
          onClick={() => {
            history.push("/profile");
          }}
        />
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default AuthSection;
