const { Router } = require("express");
const {
  login,
  googleSignIn,
  forgotPassword,
  resetPassword,
} = require("../controllers/authentication.controller.js");

const router = Router();

//Ruta para hacer login de usuario
router.post("/", login);
router.post("/google", googleSignIn);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

module.exports = router;
