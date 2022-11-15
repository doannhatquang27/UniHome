import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { COLORS } from "../../../../../../constants/color";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { auth, Providers } from "../../../../../../services/fire-base";

const LoginButton = () => {
  const { login } = useContext(AuthContext);
  let history = useHistory();

  const handleLogin = () => {
    auth
      .signInWithPopup(Providers.google)
      .then((response) => {
        if (response.user) {
          response.user.getIdToken().then((value) => {
            if (response.user && response.user.email) {
              loginOrRegister(value, response.user.uid, response.user.email);
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
    email: string
  ) => {
    const result = await login(tokenId, googleId);
    if (result) {
      window.location.reload();
    } else {
      history.push({
        pathname: "/register",
        state: { accessToken: tokenId, email: email, googleId: googleId },
      });
    }
  };

  return (
    <Button
      variant="text"
      style={{
        color: COLORS.appMainColor,
        fontFamily: "Inter, san-serif",
      }}
      onClick={handleLogin}
    >
      Đăng nhập
    </Button>
  );
};

export default LoginButton;
