const homeHandler = require('./home-handler.js');
const favIconHandler = require('./favicon-handler.js');
const errorHandler = require('./error-handler.js');
const statics = require('./static-handlers');

let handlers = [homeHandler, favIconHandler, statics, errorHandler];

function mainHandler(req, res) {
    for(hdlr of handlers) {
        if (!hdlr(req, res)) {
            break;
        }
    }
}

module.exports = mainHandler;