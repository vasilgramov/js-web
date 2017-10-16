const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, '/database.json')


let products = []
let count = 1

module.exports.products = { }

module.exports.products.getAll = getProducts

module.exports.products.add = (product) => {
    let products = getProducts()

    product.id = count++
    products.push(product)
    saveProducts(products)
}

module.exports.products.findByName = (name) => {
    for (let product of products) {
        if (product['name'] === name) {
            return product
        }
    }

    return null
}

function getProducts() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, '[]')
        return []
    }

    let json = fs.readFileSync(dbPath).toString() === 'undefined' ? '[]' : fs.readFileSync(dbPath).toString()   
    return JSON.parse(json)
}

function saveProducts (products) {
    let json = JSON.stringify(products)
    fs.writeFileSync(dbPath, json)
}




