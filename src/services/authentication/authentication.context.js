import React, { createContext, useState, useRef } from "react";
import { getAuth } from "firebase/auth";

import { loginRequest, registerRequest } from "./authentication.service";
export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = useRef(getAuth()).current;

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

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
