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
        req.body.creator = req.user._id

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
        category: fields.category,
        creator: fields.creator
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

        if (product.creator.equals(req.user._id) ||
            req.user.roles.indexOf('Admin') > 0) {

            updateProduct(body, product)
            updateImage(product, req.files.image)

            product.save()

            res.redirect('/?success=Product edited successfully!')
        }
    })

}

function updateProduct(newData, product) {
    Category.findById(product.category, function (err, category) {
        if (err) {
            console.log(err)
            return
        }

        category.products.pull(product._id)
        category.save(() => {
            product.name = newData.name
            product.description = newData.description
            product.price = Number(newData.price)
            product.category = newData.category

            Category.findById(product.category, function (err, category) {
                if (err) {
                    console.log(err)
                    return
                }

                category.products.push(product._id)
                category.save()
            })
        })
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

    Product.findById(id, function (err, product) {
        if (err) {
            res.redirect('/?error=Product does not exist!')
            return
        }

        if (product.creator.equals(req.user._id) ||
            req.user.roles.indexOf('Admin') > 0) {
            fs.unlinkSync('./content/' + product.image)
            Category.findById(product.category, function (err, category) {
                category.products.pull(product._id)

                category.save(() => {

                    product.remove(() => {
                        res.redirect('/')
                    })
                })
            })
        }
    })
}

function getBuyProduct(req, res) {
    let id = req.params.id

    Product.findById(id, function (err, product) {
        if (err) {
            res.redirect('/?error=Product does not exist!')
            return
        }

        res.render('product/buy', { product })
    })
}

function postBuyProduct(req, res) {
    let productId = req.params.id

    Product.findById(productId, function (err, product) {
        if (err) {
            console.log(err)
            return
        }

        product.buyer = req.user._id
        product.save().then(() => {
            req.user.boughtProducts.push(product._id)
            req.user.save().then(() => {
                res.redirect('/')
            })
        })
    })
}
