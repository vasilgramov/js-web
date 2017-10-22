const url = require('url')
const fs = require('fs')
const path = require('path')

const Product = require('../models/Product')

module.exports = {
    index: getHome
}

function getHome(req, res) {
    Product.find({}).then((products) => {
        res.render('home/index', { products })
    }).catch((err) => console.log(err))
}
