const controllers = require('../controllers')
const restrictedPages = require('../util/auth')

module.exports = app => {

    app.get('/', controllers.home.index)
    app.get('/about', restrictedPages.hasRole('admin'), controllers.home.about)

    app.get('/register', controllers.user.registerGet)
    app.post('/register', controllers.user.registerPost)
    app.post('/logout', controllers.user.logout)
    app.get('/login', controllers.user.loginGet)
    app.post('/login', controllers.user.loginPost)

    app.get('/me', controllers.user.profile)

    // TODO: add restriction only logged in users
    app.get('/addCar', controllers.car.addCarGet)
    app.post('/addCar', controllers.car.addCarPost)

    app.get('/allCars', controllers.car.viewAll)
    app.post('/rent/:id', controllers.car.rent)

    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found')
        res.end()
    })
}