const url = require('url');
const fs = require('fs');

const faviconDir = '/favicon.ico';

function getFavIcon(req, res) {
    let urlObj = url.parse(req.url);
    let path = urlObj['pathname'];

    if (path !== faviconDir) return true;
    else if (path === faviconDir) {
        fs.readFile('./recourses' + faviconDir, function(err, data) {
            if (err) {
                console.log(err['message']);
                return;
            }

            res.writeHead(200, {
                'content-type': 'image/x-icon'
            });
            
            res.write(data);
            res.end();
        })
    }
}

module.exports = getFavIcon;