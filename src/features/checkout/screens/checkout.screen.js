import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

import { CreditCardInput } from "../components/credit-card.component";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { CartContext } from "../../../services/cart/cart.context";
import { payRequest } from "../../../services/checkout/checkout.service";
import { BusinessInfoCard } from "../../business/components/businessInfoCard.component";
import { parseErrorMsg } from "../../../services/utils/helpers";
import {
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  PaymentProcessingLoading,
} from "./checkout-screen.styles";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, total, clearCart } = useContext(CartContext);
  const toast = useToast();
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const processPayment = async () => {
    try {
      if (!card || !card.id) {
        setIsLoading(false);
        const msg = parseErrorMsg("Error with payment token", "processPayment");
        toast.show(msg, {
          type: "danger",
        });
        navigation.navigate("CheckoutError", {
          error: "Please fill in a valid credit card",
        });
        return;
      }
      setIsLoading(true);
      await payRequest(card.id, total, name);
      setIsLoading(false);
      clearCart();
      navigation.navigate("CheckoutSuccess");
    } catch (error) {
      setIsLoading(false);
      const msg = parseErrorMsg(error, "payRequest");
      // toast.show(msg, {
      //   type: "danger",
      // });
      navigation.navigate("CheckoutError", {
        msg,
      });
    }
  };

  if (!cart?.length || !restaurant) {
    return (
      <SafeAreaViewContainer>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Spacer position="top" size="large" />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeAreaViewContainer>
    );
  }
  return (
    <SafeAreaViewContainer>
      {isLoading && <PaymentProcessingLoading />}
      <BusinessInfoCard business={restaurant} />
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
            <List.Section>
              {cart.map(({ item, price }, index) => (
                <List.Item key={index} title={`${item} - $${price / 100}`} />
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
        <Spacer position="top" size="medium">
          {name && <CreditCardInput name={name} onSuccess={setCard} />}
        </Spacer>

        <Spacer position="top" size="xl" />
        <PayButton
          key="button-0"
          disabled={isLoading}
          icon="cash"
          mode="contained"
          onPress={() => {
            processPayment();
          }}
        >
          Pay
        </PayButton>
        <Spacer position="top" size="medium" />
        <ClearButton
          key="button-1"
          disabled={isLoading}
          icon="cart-off"
          mode="contained"
          onPress={clearCart}
        >
          Clear Cart
        </ClearButton>
        <Spacer position="bottom" size="xl" />
      </ScrollView>
    </SafeAreaViewContainer>
  );
};
