require('dotenv').config()
const { connect } = require('mongoose')
const { MONGO_URI } = process.env

const dbConnection = async () => {
  try {
    const db = await connect(MONGO_URI)
    console.log(`db connected to ${db.connection.name}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = dbConnection