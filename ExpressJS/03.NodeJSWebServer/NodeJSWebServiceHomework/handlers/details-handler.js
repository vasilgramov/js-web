const url = require('url');
const fs = require('fs');

const db = require('../config/dataBase.js');

function getDetails(req, res) {
    let urlObj = url.parse(req.url);
    let path = urlObj['pathname'];

    if (!path.startsWith('/movies/details/')) return true;
    else if (path.startsWith('/movies/details/')) {
        fs.readFile('./views/details.html', function(err, data) {
            if (err) {
                console.log(err['message']);
                return;
            } 

            res.writeHead(200, {
                'content-type': 'text/html'
            });

            let id = path.substring(path.lastIndexOf('/') + 1, path.length);
            let movie = getMovie(id);
            
            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', movie);

            res.write(data);
            res.end();                
        }); 
    }
}

function getMovie(id) {
    let count = 1;
    for (let movie of db) {
        if (count == Number(id)) {
            return `<div class="content">
            <img src="${unescape(movie['moviePoster'])}" alt=""/>
            <h3>Title  ${movie['movieTitle'].replace(/\+/g, ' ')}</h3>
            <h3>Year ${movie['movieYear']}</h3>
            <p>${unescape(movie['movieDescription']).replace(/\+/g, ' ')}</p>
            </div>`;
        }

        count++;
    }
}

module.exports = getDetails;