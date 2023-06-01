import React from "react";

import {
  ImageBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
} from "../components/account-background.styles";

export const AccountScreen = () => {
  return (
    <ImageBackground>
      <AccountCover />
      <AccountContainer>
        <AuthButton title="Login" />
      </AccountContainer>
    </ImageBackground>
  );
};
