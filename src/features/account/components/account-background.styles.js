import styled from "styled-components/native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { colors } from "../../../infrastructure/theme/colors";

export const ImageBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
  min-width: 200px;
  min-height: 200px;
  border-radius: 50px;
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const LoadingIndicator = styled(ActivityIndicator)`
  color: ${(props) => props.theme.colors.brand.primary};
  padding: ${(props) => props.theme.space[2]};
`;

export const LottieAnimationContainer = styled.View`
  position: absolute;
  top: 12%;
  left: 10px;
  width: 100%;
  height: 20%;
  padding: ${(props) => props.theme.space[2]};
`;
