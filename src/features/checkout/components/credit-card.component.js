import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";

export const CreditCardInput = () => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    console.log(isIncomplete);
    const card = {
      number: "4242424242424242",
      exp_month: "02",
      exp_year: "24",
      cvc: "244",
      name: "Ekos",
    };
    const info = await cardTokenRequest(card);

    console.log(
      "🚀 ~ file: credit-card.component.js:22 ~ onChange ~ info:",
      info
    );
  };

  return <LiteCreditCardInput onChange={onChange} />;
};
