const { Router } = require('express');
const { allGames, postGame, detailGame, deleteGame, getGenres, putGame, dataApi,API }= require('../controllers/game.controller')

// Importar todos los routers;



const router = Router();

// Configurar los routers
router.get('/games/API',API)
//Para llenar la base de datos
router.get('/games/games', dataApi)
//Traer todos los juegos de la base de datos
router.get('/games',allGames)
//Acceder al detalle de cada juego en la base de datos
router.get('/games/:id',detailGame)
//Publicar un nuevo juego
router.post('/games', postGame)
//Borrar un juego
router.delete('/games/:id', deleteGame)
//Traer nombres de todos los generos
router.get('/games/genres', getGenres)
//Editar un juego ya existente
router.put('/games/:id', putGame)



module.exports = router;