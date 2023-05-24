import styled from "styled-components/native";
import { FlatList } from "react-native";

export const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const BusinessList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;
