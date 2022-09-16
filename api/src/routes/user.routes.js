const { Router } = require("express");
const {
  userPost,
  getUsers,
  getUserByID,
  putUser,
  becomeAdmin,
  deleteUser,
  resetUser,
} = require("../controllers/user.controller");
const { tokenVerified } = require("../middlewares/auth.middleware.js");

const router = Router();

//Ruta para regitrar nuevo usuario
router.put("/admin", becomeAdmin);
//Nuevo usuario
router.post("/users", userPost);
//List de usuarios
router.get("/users", getUsers);
//Usuairo por id
router.get("/users/:idUser", getUserByID);
//Editar un usuario
router.put("/putUser/:idUser", putUser);
//Borrar un usuario
router.delete("/deleteUser/:idUser", deleteUser);
//Become admin
router.post("/changeAdminStatus/:idUser", becomeAdmin);
//No usen esta ruta te resetea la cuenta a datos vacios, excepto por la password y el nombre
//Es por que testeando arruine cuentas, por ejemeplo un array de arrays que no deberia ser asi, y tenia que borrarlo si o si
router.post("/dontUseThisRouteDeletesTheUser/:idUser", resetUser);

module.exports = router;
