const { Router } = require('express');
const Game = require('../models/Game.js')
const axios = require('axios').default
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();




const genres = [
    'action',
    'indie',
    'adventure',
    'rPG',
    'strategy',
    'shooter',
    'casual',
    'simulation',
    'puzzle',
    'arcade',
    'platformer',
    'racing',
    'massively-multiplayer',
    'sports',
    'fighting',
    'family',
    'board Games',
    'educational',
    'card'
]


// router.get('/', async (req, res) => {

//     genres.forEach(async (current) =>{
//         const { data } = await axios.get(`https://api.rawg.io/api/games?key=8f18e9d52c1a4529b8ffba93f32936dd&genres=${current}&page_size=9`)

//         data.results.forEach((gamer) =>{
//             Game.create({
//                 name: gamer.name,
//                 background_image: gamer.background_image,
//                 platforms: gamer.platforms.map( (current) => current.platform.name),
//                 released: gamer.released,
//                 rating: gamer.rating,
//                 price: 0,
//                 genre: current,
                
                
//             })
//             console.log(gamer.id)
//             console.log(gamer.name)
//             console.log(gamer.released)
//             console.log(gamer.rating)
//             console.log(gamer.platforms.map( (current) => current.platform.name))
//             console.log(current)

//         })
        
//     })
    


    
// })


// router.get('/', async (req, res) => {
//     const games = await Game.find()
//     console.log(games)
//     res.status(200).json(games)
    
// })




// router.post('/', async ( req, res) => {
//     const { newGame } = req.body;
//     const game = new Game({ 
//         newGame 
//     })
//     console.log(game)
//     await game.save();
//     res.json({status: 'game added'})
// })

module.exports = router;
