const { Router } = require("express");
const {
  friendRequest,
  cancelFriendRequest,
  acceptFriend,
  rejectFriend,
  relationship,
  removeFriend,
  friendList,
} = require("../controllers/friends.controller");

// Importar todos los routers;

const router = Router();

// Enviar Solicitud de amistad
router.post("/friendRequest", friendRequest);
// Cancelar Solicitud de amistad
router.post("/cancelFriendRequest", cancelFriendRequest);
//Aceptar solicitud de amistad
router.post("/aceptFriend", acceptFriend);
//Rechazar solicitud de amistad
router.post("/rejectFriend", rejectFriend);
//Remover Amigo
router.post("/removeFriend", removeFriend);
//Chequear que relacion tienen
router.post("/relationship", relationship);
//Para mostrar los amigos con imagen
router.post("/friendList", friendList);

module.exports = router;
