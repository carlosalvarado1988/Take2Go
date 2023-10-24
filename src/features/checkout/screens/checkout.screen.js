import React from "react";
import { CreditCardInput } from "../components/credit-card.component";
import { SafeAreaViewContainer } from "../../../components/utilities/safe-area.component";

export const CheckoutScreen = ({ navigation }) => {
  return (
    <SafeAreaViewContainer>
      <CreditCardInput />
    </SafeAreaViewContainer>
  );
};
