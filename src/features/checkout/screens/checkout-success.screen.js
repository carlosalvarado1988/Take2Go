import React from "react";

import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { CartIconContainer, CartIcon } from "./checkout-screen.styles";

export const CheckoutSuccessScreen = () => {
  return (
    <SafeAreaViewContainer>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <Text variant="label">Success!</Text>
      </CartIconContainer>
    </SafeAreaViewContainer>
  );
};
