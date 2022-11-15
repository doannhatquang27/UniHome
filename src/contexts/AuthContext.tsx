import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"; // for storage
import React, { useCallback, useEffect, useState } from "react";
import IUser from "../interfaces/UniHouseApiInterfaces/IUser";
import { loginWithGoogle } from "../services/user-services";

interface AuthContextProps {
  currentUser: IUser | null;
  accessToken: string | null;
  checkUserHasLoggedIn: () => void;
  login: (tokenId: string, googleId: string) => Promise<boolean>;
  logout: () => void;
  updateCurrentUserContext: (user: IUser) => void;
}

export const AuthContext = React.createContext<AuthContextProps | null>(
  null
) as React.Context<AuthContextProps>;

const AuthContextProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const auth = firebase.auth();

  const checkUserHasLoggedIn = useCallback(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((value) => {
          login(value, user.uid);
        });
      } else {
        console.log("Has not logged in yet");
      }
    });
  }, [auth]);

  useEffect(() => {
    checkUserHasLoggedIn();
  }, [checkUserHasLoggedIn]);

  const login = async (tokenId: string, googleId: string) => {
    const result = await loginWithGoogle(tokenId, googleId);
    if (result) {
      if (result.user.roleName === "Renter") {
        setAccessToken(result.accessToken);
        setCurrentUser(result.user);
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    auth.signOut();
  };

  const updateCurrentUserContext = (user: IUser) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        accessToken,
        updateCurrentUserContext,
        checkUserHasLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
