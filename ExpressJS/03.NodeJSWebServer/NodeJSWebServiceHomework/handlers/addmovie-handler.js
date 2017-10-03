const url = require('url');
const fs = require('fs');

const db = require('../config/dataBase.js');

function addMovie(req, res) {
    let urlObj = url.parse(req.url);
    let path = urlObj['pathname'];

    if (path !== '/addMovie') return true;
    else if (path === '/addMovie' && req['method'] === 'GET') {
        getAddMovie(req, res);
    } else if (path === '/addMovie' && req['method'] === 'POST') {
        postAddMovie(req, res);
    }
}

function getAddMovie(req, res) {
    fs.readFile('./views/addMovie.html', function(err, data) {
        if (err) {
            console.log(err['message']);
            return;
        } 

        res.writeHead(200, {
            'content-type': 'text/html'
        });

        res.write(data);
        res.end();                
    });
}

function postAddMovie(req, res) {
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        
        let newMovie = {  };
        let tokens = body.split('&');
        for (let token of tokens) {
            let kvp = token.split('=');
            let key = kvp[0];
            let value = kvp[1];

            newMovie[key] = value;
        }

        db.push(newMovie);
    });

    res.writeHead(301,
        { Location: 'http://localhost:1234/addMovie' }
    );

    res.end();
}

module.exports = addMovie;