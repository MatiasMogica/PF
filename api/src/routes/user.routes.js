const { Router } = require("express");
const {
  userPost,
  getUsers,
  getUserByID,
  putUser,
  becomeAdmin,
  deleteUser,
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

module.exports = router;