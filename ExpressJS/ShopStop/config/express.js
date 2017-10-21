const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

module.exports = (app, config) => {

    app.use(bodyParser.urlencoded({ 
        extended: true 
    }))

    app.use(express.static(
        path.normalize(
            path.join(config.rootPath, 'content')
        )
    ))

}
