const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = (config) => {
    mongoose.connect(config.connectionString, {
        useMongoClient: true
    })

    const database = mongoose.connection

    database.once('open', (err) => {
        if (err) {
            console.log(err)
            return
        }

        User.seedAdminUser().then(() => {
            console.log('Connected!')
        }).catch((reason) => {
            console.log('Something went wrong')
            console.log(reason)
        })
    })

    database.on('error', (err) => {
        console.log(err)
    })
}