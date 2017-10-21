const controllers = require('../controllers')
const restrictedPages = require('../util/auth')

module.exports = app => {

    app.get('/', controllers.home.index)

    app.get('/register', controllers.user.registerGet)
    app.post('/register', controllers.user.registerPost)
    app.get('/logout', controllers.user.logout)
    app.get('/login', controllers.user.loginGet)
    app.post('/login', controllers.user.loginPost)

    app.get('/createProduct', restrictedPages.hasRole('admin'), controllers.admin.getCreateProduct)
    app.post('/createProduct', restrictedPages.hasRole('admin'), controllers.admin.postCreateProduct)
    
    app.get('/allOrders', controllers.admin.allOrdersGet)
    app.post('/allOrders', controllers.admin.allOrdersPost)

    app.get('/order/:id', controllers.product.getOrder)
    app.post('/order/:id', controllers.product.postOrder)

    app.get('/myOrders', controllers.product.myOrders)
    app.get('/orderDetails/:id', controllers.product.orderDetails)

    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found')
        res.end()
    })
}