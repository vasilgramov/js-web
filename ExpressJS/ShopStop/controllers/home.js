const url = require('url')
const fs = require('fs')
const path = require('path')

const Product = require('../models/Product')

module.exports = {
    index: getHome
}

function getHome(req, res) {
    Product.find({}).populate('category').then((all) => {

        let data = { }

        let products = getProductsByName(req.query.query, all)

        data.products = products
        data.error = req.query.error
        data.success = req.query.success

        res.render('home/index', data)
    }).catch((err) => console.log(err))
}

function getProductsByName(name, products) {
    let result = []

    for (let product of products) {
        if (name === undefined || 
            product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
            result.push(product)
        }
    }

    return result
}
