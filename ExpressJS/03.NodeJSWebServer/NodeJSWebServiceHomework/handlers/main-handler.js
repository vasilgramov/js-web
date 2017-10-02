const contentHandler = require('./content-handler.js');

const homeHandler = require('./home-handler.js');
const addMovieHandler = require('./addmovie-handler.js');
const viewAllMoviesHandler = require('./viewallmovies-handler.js');
const getDetails = require('./details-handler.js');

let handlers = [contentHandler, homeHandler, addMovieHandler, viewAllMoviesHandler, getDetails];

function mainHandler(req, res) {
    
    for (hdrl of handlers) {
        if(!hdrl(req, res)) {
            break;
        }
    }
}

module.exports = mainHandler;
