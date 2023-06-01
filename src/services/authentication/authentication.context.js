import React, { createContext, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  loginRequest,
  registerRequest,
  requestLogOut,
} from "./authentication.service";
export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Firebase auth instance
  const auth = useRef(getAuth()).current;

  // Observable to check if user authenticated on refresh or start on cold
  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(auth, email, password)
      .then((u) => {
        setIsLoading(false);
        setUser(u);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString(e));
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: passwords do not match");
      return;
    }
    setIsLoading(true);
    registerRequest(auth, email, password)
      .then((newUser) => {
        console.log(
          "🚀 ~ file: authentication.context.js:35 ~ .then ~ newUser:",
          newUser
        );
        setIsLoading(false);
        setUser(newUser);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString(e));
      });
  };

  const onLogout = () => {
    requestLogOut(auth).then(() => {
      setUser(null);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
