const port = 3000

const config = require('./config/config')
const database = require('./config/database.config')
const express = require('express')

const app = express()
const enviroment = process.env.NODE_ENV || 'development'

database(config[enviroment])

require('./config/express')(app, config[enviroment])
require('./config/routes')(app)

app.listen(port)
