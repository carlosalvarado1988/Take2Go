import styled from "styled-components/native";
import { Image, Text } from "react-native";
import { Card } from "react-native-paper";

export const BusinessCard = styled(Card)`
  padding: ${(props) => props.theme.space[1]};
  backgroundcolor: ${(props) => props.theme.colors.ui.secondary};
`;

export const BusinessCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[1]};
  backgroundcolor: ${(props) => props.theme.colors.ui.tertiary};
`;

export const Section = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

export const Address = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const IconsLine = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Icon = styled(Image)`
  width: 15px;
  height: 15px;
`;
