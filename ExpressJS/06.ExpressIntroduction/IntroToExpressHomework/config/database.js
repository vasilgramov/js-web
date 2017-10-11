const mongoose = require('mongoose')
const path = 'mongodb://localhost/memedb'

mongoose.Promise = global.Promise

mongoose.connect(path, { useMongoClient: true })