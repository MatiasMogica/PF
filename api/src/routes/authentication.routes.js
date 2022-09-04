const { Router } = require('express')
const { login } = require('../controllers/authentication.controller.js')

const router = Router()


//Ruta para hacer login de usuario
router.post('/', login)

module.exports =  router