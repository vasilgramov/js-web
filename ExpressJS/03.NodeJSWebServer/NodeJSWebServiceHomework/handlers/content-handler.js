const url = require('url');
const fs = require('fs');

function getContent(req, res) {
    let urlObj = url.parse(req.url);
    let path = urlObj['pathname'];
    if (path === '/favicon.ico') {
        path = '/public/images' + path;
    }

    if (!path.startsWith('/public')) return true;
    else if (path.startsWith('/public')) {
        fs.readFile('.' + path, function(err, data) {
            if (err) {
                console.log(err['message']);
                return;
            } 

            writeHead(path, res);

            res.write(data);
            res.end();                
        }); 
    }
}

function writeHead(path, res) {
    let dotIndex = path.indexOf('.');
    let extenstion = path.slice(dotIndex + 1, path.length);

    switch (extenstion) {
        case 'html':
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            break;
        case 'css':
            res.writeHead(200, {
                'content-type': 'text/css'
            });
            break;
        case 'js':
            res.writeHead(200, {
                'content-type': 'application/javascript'
            });
            break;
        case 'png':
            res.writeHead(200, {
                'content-type': 'image/png'
            });
            break;
        case 'jpg':
            res.writeHead(200, {
                'content-type': 'image/jpeg'
            });
            break;
        case 'ico':
            res.writeHead(200, {
                'content-type': 'image/x-icon'
            });
            break;
    }
}

module.exports = getContent;