const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const express = require('express');

const tokenVerified = async (req, res) => {
    try {
        const authorization = req.get('authorization')

        let token = null

        if(authorization && authorization.toLowerCase().startsWith('bearer')){
            token = authorization.subString(7)
        }

        const decodedToken = jwt.verify(token, process.env.JWT_secret_key)

        if(!token || !decodedToken.id){
            return ses.status(401).send({ error: 'Token is missing or is invalid', success: false })
        }

        

        console.log(authorization)
    } catch (error) {
        
    }
}