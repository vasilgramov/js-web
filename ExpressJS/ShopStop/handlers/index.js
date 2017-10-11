const homeHandler = require('./homeHandler.js')
const productHandler = require('./productHandler.js')

const staticHandler = require('./staticHandler.js')

// const errorHandler = require('./errorHandler.js')

module.exports = [ homeHandler, productHandler, staticHandler ]
