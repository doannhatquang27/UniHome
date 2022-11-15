import { Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { COLORS } from "../../../constants/color";
import { AuthContext } from "../../../contexts/AuthContext";
import { auth, Providers } from "../../../services/fire-base";

const useStyles = makeStyles({
  button: {
    backgroundColor: COLORS.appMainColor,
    borderRadius: 4,
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "aliceblue",
      color: COLORS.appMainColor,
    },
    color: "white",
    textTransform: "none",
    fontSize: "14px",
    padding: "3px 8px 3px 8px",
    width: "max-content",
  },
});

const LoginButton = () => {
  const { login } = useContext(AuthContext);
  const classes = useStyles();
  let history = useHistory();

  const handleLogin = () => {
    auth
      .signInWithPopup(Providers.google)
      .then((response) => {
        if (response.user) {
          response.user.getIdToken().then((value) => {
            if (
              response.user &&
              response.user.email &&
              response.user.displayName
            ) {
              loginOrRegister(
                value,
                response.user.uid,
                response.user.email,
                response.user.displayName
              );
            }
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const loginOrRegister = async (
    tokenId: string,
    googleId: string,
    email: string,
    name: string
  ) => {
    const result = await login(tokenId, googleId);
    if (result) {
      window.location.reload();
    } else {
      history.push({
        pathname: "/register",
        state: {
          accessToken: tokenId,
          email: email,
          googleId: googleId,
          name: name,
        },
      });
    }
  };

  return (
    <Button
      variant="text"
      className={classes.button}
      onClick={() => handleLogin()}
    >
      Đăng nhập / Đăng ký
    </Button>
  );
};

export default LoginButton;
