const url = require('url')
const fs = require('fs')
const path = require('path')

const formiable = require('formidable')

const Category = require('../models/Category')

module.exports = {
    getAddCategory: getAddCategory(req, res),
    postAddCategory: postAddCategory(req, res)
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
    
    // let form = new formiable.IncomingForm()

    // form.parse(req, function (err, fields, files) {
    //     let category = createCategory(fields)

    //     Category.create(category).then((category) => {
    //         res.writeHead(301, {
    //             Location: '/'
    //         })

    //         res.end()
    //     })
    // })
}

function createCategory(fields) {
    return {
        name: fields.name
    }
}
