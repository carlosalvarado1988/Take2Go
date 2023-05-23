import React from "react";
import styled from "styled-components/native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.primary};
`;

const BusinessCard = styled(Card)`
  padding: ${(props) => props.theme.space[1]};
  backgroundcolor: ${(props) => props.theme.colors.ui.secondary};
`;

const BusinessCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[1]};
  backgroundcolor: ${(props) => props.theme.colors.ui.tertiary};
`;

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const BusinessInfoCard = ({ business = {} }) => {
  const {
    name = "Some Business",
    icon,
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily,
  } = business;

  return (
    <>
      <BusinessCard elevation={5}>
        <Card.Title title={name} subtitle="Card Subtitle" left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <BusinessCardCover key={name} source={{ uri: photos[0] }} />
        <Title>{name}</Title>
        <Address>{address}</Address>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </BusinessCard>
    </>
  );
};
