import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";

export const CreditCardInput = ({ name = "Ekos", onSuccess }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    const expiry = values.expiry.split("/");
    const cardInfoForTokenRequest = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name,
    };

    if (!isIncomplete) {
      const info = await cardTokenRequest(cardInfoForTokenRequest);
      onSuccess(info);
    }
  };

  return <LiteCreditCardInput onChange={onChange} />;
};
