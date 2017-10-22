const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')

module.exports = (app, config) => {

    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }))

    app.use(bodyParser.urlencoded({ 
        extended: true 
    }))

    app.use(express.static(
        path.normalize(
            path.join(config.rootPath, 'content')
        )
    ))

    app.set('view engine', '.hbs')
    app.use(express.static('./static'))   
}
