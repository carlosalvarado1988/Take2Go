import styled from "styled-components/native";
import { StatusBar } from "react-native";

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
