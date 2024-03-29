import styled from "styled-components/native";
import {
  Avatar,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
  margin: ${(props) => props.theme.space[3]};
  margin-left: ${(props) => props.theme.space[2]};
`;

export const PayButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,
})`
  width: 80%;
  align-self: center;
  padding: ${(props) => props.theme.space[1]};
`;

export const ClearButton = styled(Button).attrs({
  buttonColor: colors.ui.error,
})`
  width: 80%;
  align-self: center;
  padding: ${(props) => props.theme.space[1]};
`;

export const PaymentProcessingLoading = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: colors.brand.primary,
})`
  position: absolute;
  top: 50%;
  left: 35%;
  z-index: 999;
`;
