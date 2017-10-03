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

    let mimeType = {
        'html': 'text/html',
        'css': 'text/css',
        'js': 'application/javascript',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'ico': 'image/x-icon'
    };

    res.writeHead(200, {
        'content-type': mimeType[extenstion]
    });
}

module.exports = getContent;