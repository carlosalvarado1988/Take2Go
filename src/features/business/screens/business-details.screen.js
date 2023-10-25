import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { ScrollView } from "react-native";

import { BusinessInfoCard } from "../components/businessInfoCard.component";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { OrderButton } from "../../business/components/businessList.styles";
import { CartContext } from "../../../services/cart/cart.context";

export const BusinessDetailsScreen = ({ navigation, route }) => {
  const { business } = route.params;
  const { addToCart } = useContext(CartContext);
  const [breakfastListExpanded, setBreakfastListExpanded] = useState(false);
  const [lunchListExpanded, setLunchListExpanded] = useState(false);
  const [dinnerListExpanded, setDinnerListExpanded] = useState(false);
  const [drinksListExpanded, setDrinksListExpanded] = useState(false);

  return (
    <SafeAreaViewContainer>
      <BusinessInfoCard business={business} />
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastListExpanded}
          onPress={() => {
            setBreakfastListExpanded(!breakfastListExpanded);
          }}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>

        <List.Accordion
          title="Lunch"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchListExpanded}
          onPress={() => {
            setLunchListExpanded(!lunchListExpanded);
          }}
        >
          <List.Item title="Burger w/ Fries" />
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>

        <List.Accordion
          title="Dinner"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerListExpanded}
          onPress={() => {
            setDinnerListExpanded(!dinnerListExpanded);
          }}
        >
          <List.Item title="Spaghetti Bolognese" />
          <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
          <List.Item title="Steak Frites" />
        </List.Accordion>

        <List.Accordion
          title="Drinks"
          // eslint-disable-next-line react/no-unstable-nested-components
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksListExpanded}
          onPress={() => {
            setDrinksListExpanded(!drinksListExpanded);
          }}
        >
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Modelo" />
          <List.Item title="Coke" />
          <List.Item title="Fanta" />
        </List.Accordion>
      </ScrollView>
      <Spacer position="bottom" size="large" />
      <OrderButton
        icon="cash"
        mode="contained"
        onPress={() => {
          addToCart(
            {
              item: "special",
              price: 1199,
            },
            business
          );
          navigation.navigate("Checkout");
        }}
      >
        Order Special Only $11.99
      </OrderButton>
      <Spacer position="top" size="xxl" />
    </SafeAreaViewContainer>
  );
};
