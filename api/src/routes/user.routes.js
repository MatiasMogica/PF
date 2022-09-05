const { Router } = require('express')
const { userPost } = require('../controllers/user.controller')
const { tokenVerified } = require('../middlewares/auth.middleware.js')

const router = Router()

//Ruta para regitrar nuevo usuario
router.post('/users', userPost)

module.exports = router