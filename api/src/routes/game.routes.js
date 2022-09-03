const { Router } = require('express');
const { allGames, postGame, detailGame, deleteGame, getGenres, putGame }= require('../controllers/game.controller')

// Importar todos los routers;



const router = Router();

// Configurar los routers



router.get('/games',allGames)
router.get('/games/:id',detailGame)
router.post('/games', postGame)
router.delete('/games/:id', deleteGame)
router.get('/games/genres', getGenres)
router.put('/games/:id', putGame)

module.exports = router;