const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },
        name: {
            type: String, 
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        hashPassword: {
            type: String,
            require: true
        },
        admin: {
            type: Boolean,
            default: false
        },
        purchasedGames: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Game'
            }
        ],
        image: {
            type: String
        },
        localStorageToken: {
            type: String
          },
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

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject._v

        delete returnedObject.hashPassword
    }
})

module.exports = model("User", userSchema)