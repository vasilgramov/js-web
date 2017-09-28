const url = require('url');
const fs = require('fs');

function getStatics(req, res) {
    let urlObj = url.parse(req.url);
    let path = urlObj['pathname'];

    if (!path.startsWith('/static')) return true;
    else if (path.startsWith('/static')) {
        if (path.endsWith('.css')) {
            res.writeHead(200, {
                'content-type': 'text/css'
            });
        } else if (path.endsWith('.js')) {
            res.writeHead(200, {
                'content-type': 'application/javascript'
            });
        }

        fs.readFile('.' + path, function(err, data) {
            if (err) {
                console.log(err['message']);
                return;
            } 

            res.write(data);
            res.end();                
        }); 
    }
        
};

module.exports = getStatics;