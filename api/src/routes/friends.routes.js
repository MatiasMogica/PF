const { Router } = require("express");
const {
  friendRequest,
  cancelFriendRequest,
  acceptFriend,
  rejectFriend,
  relationship,
  removeFriend,
  friendList,
  friendRequestList,
  searchForMatches,
  gamesDataById,
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
//Para mostrar que amigos tiene un usuario
router.post("/friendList", friendList);
//Para mostrar quienes te an enviado solicitudes de amistad con su nombre e imagen
router.post("/friendrequestlist", friendRequestList);
//Buscar el usuario en la db para mandarle solicitud de amistad
router.get("/searchForMatches/:usernameInput", searchForMatches);
//Ver juegos del usuario
router.post("/gamesDataById", gamesDataById);
module.exports = router;
