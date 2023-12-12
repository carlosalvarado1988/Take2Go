const { log } = require("firebase-functions/logger");

module.exports.payRequest = async (req, res, stripeClient) => {
  try {
    const { token, amount } = JSON.parse(req.body);
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: "USD",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    });
    log("PaymentIntent response: ", paymentIntent);
    return res.json(paymentIntent);
  } catch (error) {
    return res.status(400).json(error);
  }
};
