require('dotenv').config()
const app = require('./app.js')
const dbConnection = require('./db.js')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    dbConnection()
    console.log(`listen on port ${PORT}`)
})