import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { CreditCardInput } from "../components/credit-card.component";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { CartIconContainer, CartIcon } from "./checkout-screen.styles";
import { CartContext } from "../../../services/cart/cart.context";
import { BusinessInfoCard } from "../../business/components/businessInfoCard.component";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, total } = useContext(CartContext);

  if (!cart.length || !restaurant) {
    return (
      <SafeAreaViewContainer>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeAreaViewContainer>
    );
  }
  return (
    <SafeAreaViewContainer>
      <BusinessInfoCard business={restaurant} />
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>

            <List.Section>
              {cart.map(({ item, price }) => {
                return <List.Item title={`${item} - ${price / 100}`} />;
              })}
            </List.Section>
            <Text>Total: ${total / 100}</Text>
          </Spacer>
        </Spacer>
        <CreditCardInput />
      </ScrollView>
    </SafeAreaViewContainer>
  );
};
