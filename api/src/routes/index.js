const { Router } = require('express');
const Game = require('../models/Game.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/', async (req, res) => {
    const games = await Game.find()
    console.log(games)
    res.json(games)
    
})

router.post('/', async ( req, res) => {
    const { newGame } = req.body;
    const game = new Game({ 
        newGame 
    })
    console.log(game)
    await game.save();
    res.json({status: 'game added'})
})

module.exports = router;
