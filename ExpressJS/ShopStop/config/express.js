const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const fileUpload = require('express-fileupload')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = (app, config) => {

    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }))

    app.use(bodyParser.urlencoded({ 
        extended: true 
    }))
    app.use(fileUpload())

    app.use(cookieParser())
    app.use(session({
        secret: 'secret',
        saveUninitialized: false,
        resave: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(express.static(
        path.normalize(
            path.join(config.rootPath, 'content')
        )
    ))

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user
        }

        next()
    })

    app.set('view engine', '.hbs')
    app.use(express.static('./static'))
}
