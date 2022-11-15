import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { auth, Providers } from "../../services/fire-base";
import { loginWithGoogle } from "../../services/user-services";
import "./index.scss";

const LoginPage = () => {
  let history = useHistory();

  const handleLogin = () => {
    auth
      .signInWithPopup(Providers.google)
      .then((response) => {
        response.user?.getIdToken().then((value) => {
          login(value, response.user?.uid, response.user?.email);
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const login = async (
    tokenId: string | undefined,
    googleId: string | undefined,
    email: string | null | undefined
  ) => {
    const result = await loginWithGoogle(tokenId, googleId);
    if (result) {
      localStorage.setItem("USER", JSON.stringify(result.user));
      history.push({ pathname: "/profile" });
    } else {
      history.push({
        pathname: "/register",
        state: { accessToken: tokenId, email: email, googleId: googleId },
      });
    }
  };

  return (
    <div className="login">
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleLogin()}
        style={{ width: "100%" }}
      >
        Login by Google
      </Button>
    </div>
  );
};

export default LoginPage;
