import styled from "styled-components/native";

import { ActivityIndicator } from "react-native-paper";

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const LoadingIcon = styled(ActivityIndicator)`
  margin-left: -25px;
`;
