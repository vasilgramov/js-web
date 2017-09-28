const http = require('http');
const port = 1337;

const mainHandler = require('./handlers/main-handler.js');

http.createServer((req, res) => {
    mainHandler(req, res);
}).listen(port);

console.log('Server is running!');
