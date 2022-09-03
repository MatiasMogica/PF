const express = require('express')
const GameRouter = require('./game.routes.js')

const router = express.Router()

router.use('/', GameRouter)
router.use('*/*', (req, res) => {
    try {
        res.status(404).send(`This page doesn't exists`)
    } catch (error) {
        res.status(404).send(`This page doesn't exists`)
    }
})

module.exports = router
