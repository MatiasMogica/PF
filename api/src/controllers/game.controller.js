const Game = require('../models/Game.js')

const allGames= async(req, res, next) => {
    const {name}=req.query
    try{
        
        if(name){
            const resultBD=await Game.find({name:{
                $regex: new RegExp(name, "ig")
            }
    })
        return resultBD.length?res.status(200).json(resultBD):res.status(404).json({msg:'Game not found'})
        }
            
        const resultBD=await Game.find({})
        resultBD.length?res.status(200).json(resultBD):res.status(404).json({msg:'There are not documents on Game Model'})

    

    }
    catch(err){
        next(err)
    }

}
//----------------------------------------------------------------
const detailGame=async(req,res,next)=>{
    const {id}=req.params
try{
    const game=await Game.findById(id)
   
    game?res.status(200).json(game):res.status(404).json({message: "Game not found"})


}
catch(err){
    next(err)}
}
//----------------------------------------------------------------

// const genres = [
//     'action',
//     'indie',
//     'adventure',
//     'rPG',
//     'strategy',
//     'shooter',
//     'casual',
//     'simulation',
//     'puzzle',
//     'arcade',
//     'platformer',
//     'racing',
//     'massively-multiplayer',
//     'sports',
//     'fighting',
//     'family',
//     'board Games',
//     'educational',
//     'card'
// ]


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


const newGame = async ( req, res) => {
    const { newGame } = req.body;
    const game = new Game({ 
        newGame 
    })
    console.log(game)
    await game.save();
    res.json({status: 'game added'})
}

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

const deleteGame=async(req,res,next) => {
    const {id}=req.params
    try{

        const gameDeleted= await Game.findByIdAndDelete(id)
        if(!gameDeleted)return res.status(200).json({msg:'Game cannot be deleted'})
        return res.status(200).json({game:gameDeleted,msg:'Game deleted successfully'})

    }
    catch(err){
        next(err)
    }
}

module.exports={
    allGames,
    newGame,
    detailGame,
    getGamesById,
    getGenres,
    postGame,
    putGame,
    deleteGame
    }