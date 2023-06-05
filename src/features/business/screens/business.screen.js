import React, { useContext, useState } from "react";
import { MD2Colors } from "react-native-paper";
import { TouchableOpacity } from "react-native";

import { Search } from "../components/search.component";
import { BusinessInfoCard } from "../components/businessInfoCard.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { LoadingContainer, LoadingIcon } from "./business.screen.styles";
import { BusinessList } from "../../common/components/business-list.styles";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { FavoritesBar } from "../../../components/favorite/favorite-bar.component";
import { RestaurantContext } from "../../../services/restaurants/restaurants.context";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { FadeInView } from "../../../components/animations/fade.animation";

export const BusinessScreen = ({ navigation }) => {
  const { restaurants, isLoading } = useContext(RestaurantContext);
  const { favorites } = useContext(FavoritesContext);

  const [isFavoritesPress, setIsFavoritesPress] = useState(false);

  return (
    <SafeAreaViewContainer>
      {isLoading && (
        <LoadingContainer>
          <LoadingIcon size={50} animating={true} color={MD2Colors.red800} />
        </LoadingContainer>
      )}
      <Search
        isFavoritesPress={isFavoritesPress}
        setIsFavoritesPress={setIsFavoritesPress}
      />
      {isFavoritesPress && (
        <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />
      )}
      <BusinessList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { business: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <BusinessInfoCard business={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaViewContainer>
  );
};
