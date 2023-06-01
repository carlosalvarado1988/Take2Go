import React, { useState, useContext, useEffect } from "react";
import {
  ImageBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
} from "../components/account-background.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { onLogin, error } = useContext(AuthenticationContext);

  useEffect(() => {
    setLoginError(error);
  }, [error]);

  // to clear out message when error stuck in context from service
  useEffect(() => {
    setLoginError("");
  }, []);

  return (
    <ImageBackground>
      <AccountCover />
      <Title>Catalog</Title>
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
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Spacer>
        {loginError && (
          <ErrorContainer size="large">
            <Text variant="error">{loginError}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          <AuthButton
            icon="lock-open-check-outline"
            mode="contained"
            onPress={() => onLogin(email, password)}
          >
            Login
          </AuthButton>
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton
          icon="keyboard-backspace"
          mode="outlined"
          onPress={() => navigation.goBack()}
        >
          Back
        </AuthButton>
      </Spacer>
    </ImageBackground>
  );
};
