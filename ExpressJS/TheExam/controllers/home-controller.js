const Product = require('mongoose').model('Product')

module.exports = {
    index: (req, res) => {
        Product.find({}).then((products) => {
            let chickens = []
            let beefs = []
            let lambs = []

            for (let product of products) {
                if (product.category.toLowerCase() === 'chicken') {
                    chickens.push(product)
                } else if (product.category.toLowerCase() === 'beef') {
                    beefs.push(product)
                } else if (product.category.toLowerCase() === 'lamb') {
                    lambs.push(product)
                }
            }

            res.render('home/index', { chickens: chickens, beefs: beefs, lambs: lambs })
        })
    }
}