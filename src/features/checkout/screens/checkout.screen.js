import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { CreditCardInput } from "../components/credit-card.component";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
} from "./checkout-screen.styles";
import { CartContext } from "../../../services/cart/cart.context";
import { BusinessInfoCard } from "../../business/components/businessInfoCard.component";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, total, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
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
              {cart.map(({ item, price }) => (
                <List.Item key={item} title={`${item} - $${price / 100}`} />
              ))}
            </List.Section>
            <Text>Total: ${total / 100}</Text>
          </Spacer>
        </Spacer>
        <NameInput
          mode="flat"
          label="Name"
          value={name}
          onChangeText={setName}
        />
        <Spacer position="top" size="large">
          {name && <CreditCardInput name={name} />}
        </Spacer>
        <Spacer position="top" size="xl" />
        <PayButton
          icon="cash"
          mode="contained"
          onPress={() => console.log("pay")}
        >
          Pay
        </PayButton>
        <Spacer position="top" size="large" />
        <ClearButton icon="cart-off" mode="contained" onPress={clearCart}>
          Clear Cart
        </ClearButton>
      </ScrollView>
    </SafeAreaViewContainer>
  );
};
