const url = require('url')
const fs = require('fs')
const path = require('path')

const formiable = require('formidable')

const Category = require('../models/Category')

module.exports = {
    getAddCategory: getAddCategory,
    postAddCategory: postAddCategory
}

function getAddCategory(req, res) {
    res.render('category/add')
}

function postAddCategory(req, res) {
    let categoryObj = req.body

    let category = createCategory(categoryObj)
    Category.create(category).then((category) => {
        res.redirect('/')
    })
}

function createCategory(fields) {
    return {
        name: fields.name
    }
}
