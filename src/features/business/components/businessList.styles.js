import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const OrderButton = styled(Button).attrs({
  buttonColor: colors.brand.secondary,
})`
  padding: ${(props) => props.theme.space[2]};
  widht: 80%;
  align-self: center;
`;
