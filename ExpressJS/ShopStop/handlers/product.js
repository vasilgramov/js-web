const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const formidable = require('formidable')
const shortid = require('shortid')

const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports = {
    getAddProduct: getAddProcuct,
    postAddProduct: postAddProduct
}

function getAddProcuct(req, res) {
    res.render('product/add')
}

function postAddProduct(req, res) {
    console.log(req.body)
}

function getProduct(fields) {

    return {
        name: fields.name,
        description: fields.description,
        price: Number(fields.price),
        image: fields.image,
        category: fields.category
    }
}
