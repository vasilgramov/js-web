const url = require('url');
const fs = require('fs');

const errorDir = './views/404.html';

function displayError(req, res) {
    fs.readFile(errorDir, (err, data) => {
        if (err) {
            console.log(err['message']);
            return;
        }

        res.writeHead(404, {
            'content-type': 'text/html'
        });
        res.write(data);

        res.end();
    });
}

module.exports = displayError;