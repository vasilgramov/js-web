const url = require('url');
const fs = require('fs');

const db = require('../config/dataBase.js');

function viewAllMovies(req, res) {
    let urlObj = url.parse(req.url);
    let path = urlObj['pathname'];

    if (path !== '/viewAllMovies') return true;
    else if (path === '/viewAllMovies') {
        fs.readFile('./views/viewAll.html', function(err, data) {
            if (err) {
                console.log(err['message']);
                return;
            } 

            res.writeHead(200, {
                'content-type': 'text/html'
            });

            
            let movies = getMovies();
            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movies);
            
            res.write(data);
            res.end();                
        }); 
    }
}

function getMovies() {
    let movies = '';
    let count = 1;
    for (let movie of db) {
        movies += `<div class="movie">
                        <a href="/movies/details/${count++}"><img class="moviePoster" src="${unescape(movie['moviePoster'])}"/> </a>
                    </div>`;
    }

    return movies;
}

module.exports = viewAllMovies;