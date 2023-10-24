import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51O4r8aL70B3XRAS1sntZOjwivUinc0kY04wYd1lNU2piXurmLtI2DRe4D9UVSrUf5kvMrt2eZ4xYIFgd1N2W1gr100WDCqUEC1"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });
