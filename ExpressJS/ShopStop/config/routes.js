const handlers = require('../controllers')
const auth = require('../utilities/auth')

module.exports = (app) => {
  app.get('/', handlers.home.index)

  // User
  app.get('/user/register', handlers.user.getRegister)
  app.post('/user/register', handlers.user.postRegister)
  app.get('/user/login', handlers.user.loginGet)
  app.post('/user/login', handlers.user.loginPost)
  app.post('/user/logout', handlers.user.logout)

  // Products
  app.get('/product/add', auth.isAuthenticated, handlers.product.getAddProduct)
  app.post('/product/add', auth.isAuthenticated, handlers.product.postAddProduct)

  app.get('/product/edit/:id', auth.isAuthenticated, handlers.product.getEditProduct)
  app.post('/product/edit/:id', auth.isAuthenticated, handlers.product.postEditProduct)

  app.get('/product/delete/:id', auth.isAuthenticated, handlers.product.getDeleteProduct)
  app.post('/product/delete/:id', auth.isAuthenticated, handlers.product.postDeleteProduct)

  app.get('/product/buy/:id', auth.isAuthenticated, handlers.product.getBuyProduct)
  app.post('/product/buy/:id', auth.isAuthenticated, handlers.product.postBuyProduct)

  // Category
  app.get('/category/add', auth.isInRole('Admin'), handlers.category.getAddCategory)
  app.post('/category/add', auth.isInRole('Admin'), handlers.category.postAddCategory)

  app.get('/category/:category/products', handlers.category.getProductsByCategory)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}