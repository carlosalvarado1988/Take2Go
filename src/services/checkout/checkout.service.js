import createStripe from "stripe-client";
import { getFunctionsHost } from "../../services/utils/env";
import { STRIPE_API_KEY } from "@env";

const stripe = createStripe(STRIPE_API_KEY);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = async (token, amount, name) => {
  console.log("payRequest ~ name:", name);
  console.log("payRequest ~ amount:", amount);
  console.log("payRequest ~ token:", token);

  const host = getFunctionsHost("pay");
  try {
    const res = await fetch(`${host}/pay`, {
      method: "POST",
      body: JSON.stringify({
        token,
        amount,
        name,
      }),
    });

    console.log("🚀 ~ file: checkout.service.js:22 ~ payRequest ~ res:", res);
    if (res.status > 200) {
      throw Error("Something went wrong with your payment");
    }
    return res.json();
  } catch (error) {
    throw error;
  }
};

// Promise way
// export const payRequest = async (token, amount, name) => {
//   const host = getFunctionsHost("pay");
//   return fetch(`${host}/pay`, {
//     method: "POST",
//     body: JSON.stringify({
//       token,
//       amount,
//       name,
//     }),
//   })
//     .then((res) => {
//       if (res.status > 200) {
//         return Promise.reject(Error("Something went wrong with your payment"));
//       }
//       return res.json();
//     })
//     .catch((err) => {
//       return Promise.reject(err);
//     });
// };
