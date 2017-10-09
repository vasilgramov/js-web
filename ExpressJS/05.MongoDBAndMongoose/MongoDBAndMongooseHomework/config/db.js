const mongoose = require('mongoose')
const path = 'mongodb://localhost:27017/homework'

mongoose.Promise = global.Promise

mongoose.connect(path, { useMongoClient: true })