import React from "react";
import styled from "styled-components/native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const Title = styled.Text`
  padding: 26px;
  font-size: 40px;
`;

const BusinessCard = styled(Card)`
  padding: 3px;
  backgroundcolor: white;
`;

const BusinessCardCover = styled(Card.Cover)`
  padding: 3px;
  backgroundcolor: gray;
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
          <Title>Some title here</Title>
        </Card.Content>
        <BusinessCardCover key={name} source={{ uri: photos[0] }} />

        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </BusinessCard>
    </>
  );
};
