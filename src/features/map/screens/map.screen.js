import React from "react";
import MapView from "react-native-maps";

import { Search } from "../components/search.component";
import styled from "styled-components/native";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = () => {
  return (
    <>
      <Search />
      <Map />
    </>
  );
};
