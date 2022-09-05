const { Schema, model } = require('mongoose')

const gameSchema = new Schema(
    {
        idAPI: {
          type: String,
          
        },
        name: {
            type: String,
            required: true,
            unique: true
          },
          background_image: {
            type: String,
            required: true,
          },
          platforms: [
            { 
            type: Schema.Types.String,
            required: true
          },
        ],
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
          genres: [
            {
              type: Schema.Types.String,
              required: true
            }
          ],
          deleted: {
            type: Boolean,
            default: false
          }
    }, 
    {
      timestamps: true,
      versionKey: false
    }
)

module.exports = model("Game", gameSchema);