import React from "react";

import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import { CartIconContainer, CartIcon } from "./checkout-screen.styles";

export const CheckoutErrorScreen = ({ route }) => {
  const { error = "" } = route.params;
  return (
    <SafeAreaViewContainer>
      <CartIconContainer>
        <CartIcon icon="check-bold" bg={colors.ui.error} />
        <Spacer position="top" size="large" />
        <Text variant="label">{error}</Text>
      </CartIconContainer>
    </SafeAreaViewContainer>
  );
};
