const controllers = require('../controllers')
const restrictedPages = require('../util/auth')

module.exports = app => {

    app.get('/', controllers.home.index)

    app.get('/user/register', controllers.user.registerGet)
    app.post('/user/register', controllers.user.registerPost)
    app.post('/user/logout', controllers.user.logout)
    app.get('/user/login', controllers.user.loginGet)
    app.post('/user/login', controllers.user.loginPost)

    app.get('/user/:id/block', controllers.user.blockUser)
    app.get('/user/:id/unblock', controllers.user.unblockUser)

    app.get('/user/find', controllers.user.findUser)

    app.get('/thread/:username', controllers.thread.getChatRoom)
    app.post('/thread/:username', controllers.thread.postMessage)


    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found')
        res.end()
    })
}