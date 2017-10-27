const handlers = require('../handlers')

module.exports = (app) => {
  app.get('/', handlers.home.index)

  app.get('/product/add', handlers.product.getAddProduct)
  app.post('/product/add', handlers.product.postAddProduct)

  app.get('/product/edit/:id', handlers.product.getEditProduct)
  app.post('/product/edit/:id', handlers.product.postEditProduct)

  app.get('/product/delete/:id', handlers.product.getDeleteProduct)
  app.post('/product/delete/:id', handlers.product.postDeleteProduct)

  app.get('/product/buy/:id', handlers.product.getBuyProduct)
  app.post('/product/buy/:id', handlers.product.postBuyProduct)

  app.get('/category/add', handlers.category.getAddCategory)
  app.post('/category/add', handlers.category.postAddCategory)

  app.get('/category/:category/products', handlers.category.getProductsByCategory)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}