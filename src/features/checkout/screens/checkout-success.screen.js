import React from "react";

import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { CartIconContainer, CartIcon } from "./checkout-screen.styles";

export const CheckoutSuccessScreen = () => {
  return (
    <SafeAreaViewContainer>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <Spacer position="top" size="large" />
        <Text variant="label">Success!</Text>
      </CartIconContainer>
    </SafeAreaViewContainer>
  );
};
