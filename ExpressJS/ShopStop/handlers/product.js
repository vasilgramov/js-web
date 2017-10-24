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
    postAddProduct: postAddProduct,
    getEditProduct: getEditProduct,
    postEditProduct: postEditProduct
}

function getAddProcuct(req, res) {
    Category.find({}).then((categories) => {
        res.render('product/add', { categories })
    }).catch((err) => console.log(err))
}

function postAddProduct(req, res) {

    let id = shortid.generate()
    let path = `content/images/${id}.jpg`
    
    req.files.image.mv(path, function (err) {
        if (err) {
            console.log(err)
            return
        }

        req.body.image = `/images/${id}.jpg`
        
        let product = getProduct(req.body)
        Product.create(product).then((product) => {
            Category.findById(req.body.category, function (err, category) {
                console.log(category)
                category.products.push(product._id)

                category.save(() => {
                    res.redirect('/')
                })
            })
        }).catch((err) => console.log(err))
    })
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

function getEditProduct(req, res) {
    let productId = req.params.id

    Product.findById(productId, function (err, product) {
        if (err) {
            console.log(err)
            return
        }

        Category.find({}, function (err, categories) {
            if (err) {
                console.log(err)
                return
            }

            // TODO: REMOVE CURRENT PRODUCT FROM CATEGORIES

            markCurrentCateogy(product.category, categories)
            res.render('product/edit', { product, categories })
        })
    })
}

function markCurrentCateogy(currentId, categories) {
    for (let category of categories) {
        if ((category._id + '') === (currentId + '')) {
            category.current = true
            return
        }
    }
}

function postEditProduct(req, res) {

    let productId = req.params.id
    let body = req.body

    Product.findById(productId, function (err, product) {
        if (err) {
            console.log(err)
            return
        }


        // TODO: CHECK IF NEW IMAGE IS UPLOADED
        //       ...REMOVE THE OLD ONE

        updateProduct(body, product)


    })

}

function updateProduct(newData, product) {
    product.name = newData.name
    product.description = newData.description
    product.price = Number(newData.price)
    product.category = newData.category
}
