const { Schema, model } = require('mongoose')

const gameSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          description: { 
            type: String,
            required: true
          },
          released:{ 
            type: String
          },
          rating:{
            type: Number
          },
          price: {
            type: Number,
            required: true,
          },
    }
)

module.exports = model("Game", gameSchema);