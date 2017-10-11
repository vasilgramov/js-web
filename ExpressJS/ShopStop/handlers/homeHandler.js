const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')

const database = require('../config/database')

module.exports = ((req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (!(req.pathname === '/' && req.method === 'GET')) return true
    else if (req.pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html'))
            
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err)
                return
            }

            let queryData = qs.parse(url.parse(req.url).query)
            console.log(queryData.query)

            let content = ''            
            let products = database.products.getAll()
            for (let product of products) {
                if (queryData.query === undefined || 
                    queryData.query.toString().toLowerCase() === product.name.toString().toLowerCase()) {
                    content += 
                    `<div class="product-card">
                    <img class="product-img" src="${product.image}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    </div>`
                }
            }

            res.writeHead(200, {
                'content-type': 'text/html'
            })

            data = data.toString().replace('{content}', content)

            res.write(data)
            res.end()
        })
    } 
})