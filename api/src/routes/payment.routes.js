const { response } = require("express");
const express = require("express");
const { payment } = require("mercadopago");
const router = express.Router();
const axios = require("axios");
const CourierClient = require("@trycourier/courier").CourierClient;
const courier = CourierClient({
  authorizationToken: process.env.COURRIER_API_KEY,
});
// const PaymentController = require('../controllers/payment.controller')
// const PaymentService = require('../services/PaymentServices')

// const PaymentInstance = new PaymentController(new PaymentService());

// router.get("/payment", function (req, res, next) {
//     PaymentInstance.getPaymentLink(req, res);
//   });

// SDK de Mercado Pago
let order;
let games_id;
let cartItems;
const mercadopago = require("mercadopago");
const { dataApi } = require("../controllers/game.controller");
const { ACCES_TOKEN } = process.env;
// Agrega credenciales
mercadopago.configure({
  access_token: ACCES_TOKEN,
});

router.post("/payment", async (req, res) => {
  // Crea un objeto de preferencia
  /*cartItems=JSON.parse(req.body.cartItems)
  console.log(cartItems)*/

  games_id = [...req.body.games_id.split(",")].map((i) => {
    return { _id: i };
  });
  console.log(games_id);
  cartItems = [...req.body.cartItems.split(",")];
  const games = cartItems.map((item) => {
    return {
      title: item.split("%")[0],
      subtotal_price: parseInt(item.split("%")[1]),
    };
  });

  order = {
    user_id: req.body.user_id,
    username: req.body.username,
    games: games,
    total_price: parseInt(req.body.price),
  };
  let preference = {
    items: [
      {
        id: "item-ID-1234",
        title: req.body.title,
        currency_id: "ARS",
        picture_url: req.body.picture_url,
        description: "Descripción del Item",
        quantity: 1,
        unit_price: parseInt(req.body.price),
      },
    ],
    payer: {
      name: "Juan",
      surname: "Lopez",
      email: "user@email.com",
      phone: {
        area_code: "11",
        number: 4444 - 4444,
      },
    },
    back_urls: {
      success: "http://localhost:3001/payment/payment",
      failure: "http://localhost:3001/payment/payment",
      pending: "http://localhost:3001/payment/payment",
    },
  };
  try {
    const data = await mercadopago.preferences.create(preference);

    res.redirect(data.body.init_point);

    console.log(data);
  } catch (e) {
    console.log(e);
  }
});

router.get("/payment", async (req, res, next) => {
  try {
    order.payment_status = req.query.status;
    order.payment_method = req.query.payment_type;

    const { data } = await axios.post(
      "http://localhost:3001/order/postOrder",
      order
    );
    if (!data) return res.status(400).send("Order not created");

    if (req.query.status === "approved") {
      //actualizar juegos comprados
      await axios.put(
        `http://localhost:3001/users/userGames/${order.user_id}`,
        { cartItems: games_id }
      );

      await courier.send({
        message: {
          to: {
            data: {
              name: "someone purchased some games",
            },

            email: "aca va el email al que queres que se le envie el mensaje",
          },
          content: {
            title: "Z-Team || New games purchased Successfully",
            body: "",
          },
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
      });
    }
    res.redirect(`http://localhost:3000/payment?order_id=${data.id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
