const mongoose = require('mongoose')
const path = 'mongodb://admin:admin@ds115625.mlab.com:15625/playground'

mongoose.Promise = global.Promise

mongoose.connect(path, { useMongoClient: true })