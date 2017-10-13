const mongoose = require('mongoose')
const path = 'mongodb://localhost/dbmeme'

mongoose.Promise = global.Promise

mongoose.connect(path, { useMongoClient: true })