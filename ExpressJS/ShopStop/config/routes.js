const handlers = require('../handlers')

module.exports = (app) => {
  app.get('/', handlers.home.index)

  app.get('/product/add', handlers.product.getAddProduct)
  app.post('/product/add', handlers.product.postAddProduct)

  app.get('/category/add', handlers.category.getAddCategory)
  app.post('/category/add', handlers.category.postAddCategory)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}