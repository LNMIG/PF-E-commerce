const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/index.js')

require('./db.js')

const server = express()

server.name = 'API'

server.use(express.json())
server.use(morgan('dev'))
server.use(cors())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('HTTP/1.1 200 OK')
  next()
})
server.options('/*', (_req, res) => {
  res.sendStatus(200)
})

server.use('/', routes)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = server
