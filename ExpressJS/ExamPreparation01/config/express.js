const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = (app) => {

    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user
        }

        next()
    })

    app.set('view engine', 'pug');
    app.use(express.static('./static'))
}