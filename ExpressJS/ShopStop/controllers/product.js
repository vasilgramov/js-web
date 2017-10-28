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
    postEditProduct: postEditProduct,
    getDeleteProduct: getDeleteProduct,
    postDeleteProduct: postDeleteProduct,
    getBuyProduct: getBuyProduct,
    postBuyProduct: postBuyProduct
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

        updateProduct(body, product)
        updateImage(product, req.files.image)

        product.save()

        res.redirect('/?success=Product edited successfully!')
    })
}

function updateProduct(newData, product) {
    removeOlderCategory(newData, product)

    product.name = newData.name
    product.description = newData.description
    product.price = Number(newData.price)
    product.category = newData.category

    updateNewCategory(product)
}

function removeOlderCategory(newData, product) {
    if ((newData.category + '') !== (product.category + '')) {
        Category.findById(product.category, function (err, category) {
            if (err) {
                console.log(err)
                return
            }

            category.products.pull(product._id)
            category.save()
        })
    }
}

function updateNewCategory(product) {
    Category.findById(product.category, function (err, category) {
        if (err) {
            console.log(err)
            return
        }

        category.products.push(product._id)
        category.save()
    })
}

function updateImage(product, image) {
    if (image !== undefined) {
        fs.unlinkSync(`content${product.image}`)

        let id = shortid.generate()
        product.image = `/images/${id}.jpg`
        let path = `content/images/${id}.jpg`
        image.mv(path, function (err) {
            if (err) console.log(err)
        })
    }
}

function getDeleteProduct(req, res) {
    let id = req.params.id

    Product.findById(id, function (err, product) {
        if (err) {
            res.redirect('/?error=Product does not exist!')
            return
        }

        res.render('product/delete', { product })
    })
}

function postDeleteProduct(req, res) {
    let id = req.params.id

    Product.findById(id).remove(function (err) {
        if (err) {
            res.redirect('/?error=Product does not exist!')
            return
        }


        // TODO DELETE IMAGE AND FROM CATEGORY

        res.redirect('/?success=Product deleted successfully!')
    })
}

function getBuyProduct(req, res) {
    let id = req.params.id

    Product.findById(id, function(err, product) {
        if (err) {
            res.redirect('/?error=Product does not exist!')
            return
        }

        res.render('product/buy', { product })
    })
}

function postBuyProduct(req, res) {
    // TODO
}
