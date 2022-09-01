const { Router } = require('express');
const {allGames,newGame,detailGame}= require('./controllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/games',allGames)
router.get('/games/:id',detailGame)
router.post('/games', newGame)

module.exports = router;
