import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";

export const CreditCardInput = ({ name = "Ekos" }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    console.log(isIncomplete);
    const expiry = values.expiry.split("/");
    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name,
    };
    const info = await cardTokenRequest(card);

    console.log(
      "🚀 ~ file: credit-card.component.js:22 ~ onChange ~ info:",
      info
    );
  };

  return <LiteCreditCardInput onChange={onChange} />;
};
