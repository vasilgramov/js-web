const url = require('url')
const fs = require('fs')
const path = require('path')

const formiable = require('formidable')

const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
    getAddCategory: getAddCategory,
    postAddCategory: postAddCategory,
    getProductsByCategory: getProductsByCategory
}

function getAddCategory(req, res) {
    res.render('category/add')
}

function postAddCategory(req, res) {
    let categoryObj = req.body
    categoryObj.creator = req.user._id

    let category = createCategory(categoryObj)
    Category.create(category, function (err, category) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/')
    })
}

function createCategory(fields) {
    return {
        name: fields.name,
        creator: fields.creator
    }
}

function getProductsByCategory(req, res) {
    let category = req.params.category

    Category.findOne({ name: category }).populate('products').then((category) => {
        res.render('category/products', { category })
    })
}
