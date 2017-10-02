const url = require('url');
const fs = require('fs');

function getHome(req, res) {
    let urlObj = url.parse(req.url);
    let path = urlObj['pathname'];

    if (path !== '/') return true;
    else if (path === '/') {
        fs.readFile('./views/home.html', function(err, data) {
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
}

module.exports = getHome;