import React, { useState, useContext } from "react";
import {
  ImageBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
} from "../components/account-background.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error } = useContext(AuthenticationContext);
  console.log("🚀 ~ file: login.screen.js:15 ~ LoginScreen ~ error:", error);

  return (
    <ImageBackground>
      <AccountCover />
      <AccountContainer>
        <AuthInput
          label="E-mail"
          mode="outlined"
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            mode="outlined"
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry
            secure
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthButton
            icon="lock-open-check-outline"
            mode="outlined"
            onPress={() => onLogin(email, password)}
          >
            Login
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </ImageBackground>
  );
};
