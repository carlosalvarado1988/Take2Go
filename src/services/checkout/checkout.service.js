import createStripe from "stripe-client";
import { getFunctionsHost } from "../../services/utils/env";

const stripe = createStripe(
  "pk_test_51O4r8aL70B3XRAS1sntZOjwivUinc0kY04wYd1lNU2piXurmLtI2DRe4D9UVSrUf5kvMrt2eZ4xYIFgd1N2W1gr100WDCqUEC1"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = async (token, amount, name) => {
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
