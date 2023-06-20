import styled from "styled-components/native";
import { List } from "react-native-paper";

export const AvatarContainer = styled.View`
  align-items: center;
  padding-top: 10px;
`;

export const ListItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
