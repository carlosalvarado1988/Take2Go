import React, { useState, useContext, useEffect } from "react";

import {
  ImageBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
  LoadingIndicator,
} from "../components/account-background.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [registerError, setRegisterError] = useState("");
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  useEffect(() => {
    setRegisterError(error);
  }, [error]);

  // to clear out message when error stuck in context from service
  useEffect(() => {
    setRegisterError("");
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
            label="New Password"
            mode="outlined"
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            mode="outlined"
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry
            value={repeatedPassword}
            onChangeText={(text) => setRepeatedPassword(text)}
          />
        </Spacer>
        {registerError && (
          <ErrorContainer size="large">
            <Text variant="error">{registerError}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {isLoading ? (
            <LoadingIndicator animating={true} />
          ) : (
            <AuthButton
              icon="email-outline"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Register
            </AuthButton>
          )}
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
