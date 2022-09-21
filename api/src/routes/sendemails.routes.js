const { Router } = require("express");
const { sendContact } = require("../controllers/sendemails.controller");

//Esto lo deberiamos usar para que solamente un usuario logueado correctamente pueda usar estas rutas, pero no lo estamos aplicando...
const { tokenVerified } = require("../middlewares/auth.middleware.js");

const router = Router();

//Ruta para el formulario de contacto
//Require un message,contactData y senderName
router.post("/sendContact", sendContact);

//Ruta para cuando el usuario se Registra

//Ruta para cuando un juego entra en la lista de desdeados

//Ruta para cuando un usuario compra un juego

module.exports = router;
