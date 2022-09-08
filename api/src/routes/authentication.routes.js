const { Router } = require("express");
const {
  login,
  googleSignIn,
} = require("../controllers/authentication.controller.js");

const router = Router();

//Ruta para hacer login de usuario
router.post("/", login);
router.post("/google", googleSignIn);

module.exports = router;
