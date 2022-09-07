const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')



const login = async (req, res) => {
    const { username, password } = req.body

    
    const user = await User.find({ username })

    console.log(user)


    const passwordCorrect = user === null || user.length === 0
    ? false 
    : await bcrypt.compare(password, user[0].hashPassword)

    if(!(user && passwordCorrect)){
        return res.status(401).json({ error: 'Invalid user or password' })
    }

    const userForToken = {
        id: user[0]._id,
        username: user[0].username,
        email: user[0].email,
        admin: user[0].admin
    }

    const token = jwt.sign(userForToken, process.env.JWT_secret_key)
    res.cookie("token", token);
    res.status(200).json({ auth: "User login success", userForToken })
}

module.exports = {
    login
}