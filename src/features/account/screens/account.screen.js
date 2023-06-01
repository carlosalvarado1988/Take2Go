import React from "react";
import LottieView from "lottie-react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  ImageBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
  LottieAnimationContainer,
} from "../components/account-background.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <ImageBackground>
      <AccountCover />
      <LottieAnimationContainer>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/order-check.json")}
        />
      </LottieAnimationContainer>
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
            icon="email-outline"
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
