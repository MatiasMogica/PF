const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

dotenv.config()

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({
  limit: '50mb',
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use((req, res, next) => {


  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
})

app.use('/', routes)

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = app;