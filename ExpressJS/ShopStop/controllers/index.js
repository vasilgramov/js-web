const homeController = require('./home')
const userController = require('./user')
const productController = require('./product')
const categoryController = require('./category')

module.exports = {
    home: homeController,
    user: userController,
    product: productController,
    category: categoryController
}
