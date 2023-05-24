import React from "react";
import { SvgXml } from "react-native-svg";
import {
  BusinessCard,
  BusinessCardCover,
  Section,
  IconsLine,
  Rating,
  SectionEnd,
  Icon,
  Address,
} from "./businessInfoCard.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import star from "../../../../assets/star.js";
import open from "../../../../assets/open.js";

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
        <BusinessCardCover key={name} source={{ uri: photos[0] }} />

        <Section>
          <Text variant="label">{name}</Text>
          <IconsLine>
            <Rating>
              {ratingArray.map((_, i) => (
                <SvgXml xml={star} key={i} width={20} height={20} />
              ))}
            </Rating>
            <SectionEnd>
              {isClosedTemporarily && (
                <Text variant="error">CLOSED TEMPORARILY</Text>
              )}
              <Spacer position="left" size="large">
                {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
              </Spacer>
              <Spacer position="left" size="large">
                <Icon source={{ uri: icon }} />
              </Spacer>
            </SectionEnd>
          </IconsLine>
          <Address>{address}</Address>
        </Section>
      </BusinessCard>
    </>
  );
};
