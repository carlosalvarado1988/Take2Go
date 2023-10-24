import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51O4r8aL70B3XRAS1sntZOjwivUinc0kY04wYd1lNU2piXurmLtI2DRe4D9UVSrUf5kvMrt2eZ4xYIFgd1N2W1gr100WDCqUEC1"
);

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
    const info = await stripe.createToken({ card });
    console.log(
      "🚀 ~ file: credit-card.component.js:22 ~ onChange ~ info:",
      info
    );
  };

  return <LiteCreditCardInput onChange={onChange} />;
};
