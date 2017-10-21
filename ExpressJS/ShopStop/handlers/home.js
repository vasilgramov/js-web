const url = require('url')
const fs = require('fs')
const path = require('path')

const Product = require('../models/Product')

module.exports = (req, res) => {
    index: getHome
}

function getHome(req, res) {
    let filePath = path.normalize(
        path.join(__dirname, '../views/home/index.html'))

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        let queryData = req.query

        Product.find({}, function (err, products) {
            let content = getContent(queryData, products)

            res.writeHead(200, {
                'content-type': 'text/html'
            })

            data = data.toString().replace('{content}', content)

            res.write(data)
            res.end()
        })
    })
}

function getContent(queryData, products) {
    let content = ''

    for (let product of products) {
        if (queryData.query === undefined ||
            queryData.query.toString().toLowerCase() === product.name.toString().toLowerCase()) {
            content +=
                `<div class="product-card">
                <img class="product-img" src="${product.image}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                </div>`
        }
    }

    return content
}
