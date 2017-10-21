const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const formidable = require('formidable')
const shortid = require('shortid')

const Product = require('../models/Product')
const Category = require('../models/Category')

module.exports = {
    getAddProduct: getAddProcuct(req, res),
    postAddProduct: postAddProduct(req, res)
}

function getAddProcuct(req, res) {
    let filePath = path.normalize(
        path.join(__dirname, '../views/products/add.html'))

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        Category.find({}, function (err, categories) {
            let content = getCategoriesContent(categories)

            data = data.toString().replace('{categories}', content)

            res.writeHead(200, {
                'content-type': 'text/html'
            })
    
            res.write(data)
            res.end()
        })
    })
}

function postAddProduct(req, res) {

    let productObj = req.body
    productObj.image = '/' + req.file.path

    console.log('CHECK IMAGE URL')
    console.log(productObj)

    let product = getProduct(productObj)

    Product.create(product).then((product) => {
        Category.findById(product.category).then((category) => {
            category.products.push(product._id)
            category.save()
        })

        res.redirect('/')
    })


    // let form = new formidable.IncomingForm()

    // let imageName = shortid.generate()
    // form.on('fileBegin', function (name, file) {
    //     file.name = imageName
    //     file.path = `./content/images/${imageName}.jpg`
    // })

    // form.parse(req, function (err, fields, files) {

    //     fields.image = `./content/images/${imageName}.jpg`

    //     let product = getProduct(fields)
    //     Product.create(product).then((product) => {
            
    //         Category.findById(product.category, function (err, category) {
    //             category.products.push(product)

    //             category.save(function (err) {
    //                 res.writeHead(301, {
    //                     Location: '/'
    //                 })
        
    //                 res.end()
    //             })
    //         })
    //     })
    // });
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

function getCategoriesContent(categories) {
    let content = '<select class="input-field" name="category">'
    
    for (let category of categories) {
        content += `<option value=${category._id}>${category.name}</option>`
    }

    content += '</select>'
    

    return content
}
