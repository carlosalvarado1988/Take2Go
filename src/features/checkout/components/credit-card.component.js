import React from "react";
import { useToast } from "react-native-toast-notifications";

import { LiteCreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";
import { parseErrorMsg } from "../../../services/utils/helpers";

export const CreditCardInput = ({ name, onSuccess }) => {
  const toast = useToast();

  const onChange = async (formData) => {
    try {
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
    } catch (error) {
      const msg = parseErrorMsg(error, "CreditCardInput");
      toast.show(msg, {
        type: "danger",
      });
    }
  };

  return <LiteCreditCardInput onChange={onChange} />;
};
