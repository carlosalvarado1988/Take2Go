import React from "react";
import styled from "styled-components/native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";

import { Spacer } from "../../../components/spacer/spacer.component";
import star from "../../../../assets/star.js";
import open from "../../../../assets/open.js";

const BusinessCard = styled(Card)`
  padding: ${(props) => props.theme.space[1]};
  backgroundcolor: ${(props) => props.theme.colors.ui.secondary};
`;

const BusinessCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[1]};
  backgroundcolor: ${(props) => props.theme.colors.ui.tertiary};
`;

const Section = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.primary};
`;

const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const IconsLine = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const ClosedBanner = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.error};
`;

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const BusinessInfoCard = ({ business = {} }) => {
  const {
    name = "Some Business",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = business;
  const ratingArray = Array.from(new Array(Math.ceil(rating)));
  return (
    <>
      <BusinessCard elevation={5}>
        <Card.Title title={name} subtitle="Card Subtitle" left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <BusinessCardCover key={name} source={{ uri: photos[0] }} />

        <Section>
          <Title>{name}</Title>
          <IconsLine>
            <Rating>
              {ratingArray.map((_, i) => (
                <SvgXml xml={star} key={i} width={20} height={20} />
              ))}
            </Rating>
            <SectionEnd>
              {isClosedTemporarily && (
                <ClosedBanner>CLOSED TEMPORARILY</ClosedBanner>
              )}
              <Spacer position=" left" size="large">
                {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
              </Spacer>
              <Spacer position="left" size="large">
                <Image
                  style={{ width: 15, height: 15 }}
                  source={{ uri: icon }}
                />
              </Spacer>
            </SectionEnd>
          </IconsLine>
          <Address>{address}</Address>
        </Section>

        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </BusinessCard>
    </>
  );
};
