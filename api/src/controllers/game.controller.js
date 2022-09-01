const Game = require('../models/Game.js')

const getGamesById = async (req, res) => {
    const { id } = req.params
    try {
        const game = await Game.findById(id)

        return res.status(200).json({ game: game })

        console.log(game)
    } catch (error) {
        return res.status(400).json( { error: error })
    }
    
}



const getGenres = async (req, res) => {
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
    try {
        return res.status(200).json( { genres } )
    } catch (error) {
        return res.status(400).json( { error: error } )
    }
}


const postGame = async (req, res) => {
    const game = req.body
    try {
        await Game.create(game)
        return res.status(200).json( { gameAdded: 'Game added'} )
    } catch (error) {
        return res.status(500).json( { error: error } )
    }
}

const putGame = async (req, res) => {
    const { idGame } = req.params
    const game = req.body
    try {
        const gameUpdate = await Game.updateOne({ _id: idGame}, { $set: game })
        res.status(200).json( { gameUpdate: gameUpdate } )
    } catch (error) {
        res.status(500).json( { error: error } )
    } 
}