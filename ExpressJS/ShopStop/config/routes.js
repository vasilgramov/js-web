const handlers = require('../handlers')
const multer = require('multer')

const upload = multer({ dest: './content/images' })

module.exports = (app) => {
  // app.get('/', handlers.homeHandler.index)

    // app.get('/product/add', handlers.product.getAddProduct)
    // app.post('/product/add', handlers.product.postAddProduct)

    // app.get('/category/add', handlers.category.getAddCategory)
    // app.post('/category/add', handlers.category.postAddCategory)
}