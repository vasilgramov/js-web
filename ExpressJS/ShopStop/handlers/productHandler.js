const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const formidable = require('formidable')
const shortid = require('shortid')

const database = require('../config/database')

const homeHandler = require('./homeHandler')

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    let getAdd = req.pathname === '/product/add' && req.method === 'GET'
    let postAdd = req.pathname === '/product/add' && req.method === 'POST'

    if (!getAdd && !postAdd) return true
    else if (getAdd) {
        getAddProcuct(req, res)
    } else if (postAdd) {
        postAddProduct(req, res)
    }
}

function getAddProcuct(req, res) {
    let filePath = path.normalize(
        path.join(__dirname, '../views/products/add.html'))
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        res.writeHead(200, {
            'content-type' : 'text/html'
        })

        res.write(data)
        res.end()
    })
}

function postAddProduct(req, res) {
    let form = new formidable.IncomingForm()

    let imageName = shortid.generate()
    form.on('fileBegin', function(name, file) {
        file.name = imageName
        file.path = `./content/images/${imageName}.jpg`
    })
    
    form.parse(req, function(err, fields, files) {

        fields.image = `./content/images/${imageName}.jpg`
        database.products.add(fields)

        res.writeHead(301, {
            Location: '/'
        })
        res.end()
    });
}
