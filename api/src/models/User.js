const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
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
        password: {
            type: String,
            require: true
        },
        admin: {
            type: Boolean,
            default: false
        },
        
    }
)