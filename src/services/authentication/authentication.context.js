import React, { createContext, useState, useRef } from "react";
import { getAuth } from "firebase/auth";

import { loginRequest } from "./authentication.service";
export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = useRef(getAuth()).current;

  const onLogin = (username, password) => {
    setIsLoading(true);
    loginRequest(auth, username, password)
      .then((u) => {
        setIsLoading(false);
        setUser(u);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString(e));
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{ isAutheticated: !!user, user, isLoading, error, onLogin }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
