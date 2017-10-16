const fs = require('fs')
const path = require('path')
const url = require('url')

module.exports = ((req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (!(req.pathname.startsWith('/content/') && req.method === 'GET')) return true
    else if (req.pathname.startsWith('/content/') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, `../${req.pathname}`))

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err)
                return
            }

            res.writeHead(200, {
                'content-type': getContentType(req.pathname)
            })

            res.write(data)
            res.end()
        })
    }
})


function getContentType(pathname) {
    let type = pathname.substring(pathname.lastIndexOf('.') + 1, pathname.length)
    let typeMapper =  {
        'html': 'text/html',
        'css': 'text/css',
        'ico': 'image/x-icon',
        'jpg': 'image/jpeg'
    }

    return typeMapper[type]
}