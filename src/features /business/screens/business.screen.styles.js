import styled from "styled-components/native";
import { StatusBar, FlatList } from "react-native";

export const SafeAreaViewContainer = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

export const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const BusinessList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;
