const { Router } = require('express');
const {allGames,newGame}= require('./controllers')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/games',allGames)

router.post('/games', newGame)

module.exports = router;
