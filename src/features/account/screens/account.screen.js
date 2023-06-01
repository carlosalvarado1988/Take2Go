import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  ImageBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
} from "../components/account-background.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <ImageBackground>
      <AccountCover />
      <Title>Catalog</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-check-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="lock-open-check-outline"
            mode="outlined"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </ImageBackground>
  );
};
