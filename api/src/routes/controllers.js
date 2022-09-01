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

const newGame=async ( req, res) => {
    const { newGame } = req.body;
    const game = new Game({ 
        newGame 
    })
    console.log(game)
    await game.save();
    res.json({status: 'game added'})
}

module.exports={allGames,newGame}