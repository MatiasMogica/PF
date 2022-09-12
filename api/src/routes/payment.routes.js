const express = require("express");
const router = express.Router();

// const PaymentController = require('../controllers/payment.controller')
// const PaymentService = require('../services/PaymentServices')

// const PaymentInstance = new PaymentController(new PaymentService());

// router.get("/payment", function (req, res, next) {
//     PaymentInstance.getPaymentLink(req, res);
//   });

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const { ACCES_TOKEN } = process.env;
// Agrega credenciales
mercadopago.configure({
  access_token: ACCES_TOKEN,
});

router.post("/payment", (req, res) => {
  // Crea un objeto de preferencia
  let preference = {
    //  items: [
    //   {
    //     title: req.body.title,
    //     unit_price: parseInt(req.body.price),
    //     quantity: 1,
    //   }

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
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
    },
  };
  //   ],

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body);
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
