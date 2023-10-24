import React, { useContext, useState, useEffect } from "react";
import { Marker, Callout } from "react-native-maps";
import { isEmpty } from "lodash";
import { Map } from "./map-screen.styles";
import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";

import { LocationContext } from "../../../services/location/location.context";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";

const SafeMapScreen = ({ navigation, location }) => {
  const { restaurants = [] } = useContext(RestaurantContext);

  const [latDelta, setLatDelta] = useState(0);
  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;
    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.03, // determined zoom
        }}
      >
        {restaurants.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() => {
                  navigation.navigate("RestaurantDetail", {
                    business: restaurant,
                  });
                }}
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};

// Implement HOC to prevent error when location data fails to come from GCP
export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  if (isEmpty(location)) {
    return (
      <Map
        region={{
          latitude: 100,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0.03, // determined zoom
        }}
      />
    );
  }
  return <SafeMapScreen navigation={navigation} location={location} />;
};
