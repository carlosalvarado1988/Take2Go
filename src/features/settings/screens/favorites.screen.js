import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { BusinessList } from "../../common/components/business-list.styles";
import { NoFavoritesArea } from "./favorites.styles";
import { BusinessInfoCard } from "../../business/components/businessInfoCard.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";

export const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);

  return favorites.length ? (
    <SafeAreaViewContainer>
      <BusinessList
        data={favorites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { business: item })
              }
            >
              <Spacer position="bottom" size="large">
                <BusinessInfoCard business={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaViewContainer>
  ) : (
    <NoFavoritesArea>
      <Text center>No favorites yet</Text>
    </NoFavoritesArea>
  );
};
