const fs = require('fs')
const url = require('url')
const formidable = require('formidable')
const util = require('util')

const dataBase = require('../config/dataBase.js')

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else {
    return true
  }
}

function viewAll(req, res) {
  let memes = dataBase.getDb()
  memes = memes.sort((m1, m2) => {
    return m1['timeStamp'] - m2['timeStamp']
  }).filter(m => {
    return m['privacy']
  })

  let memesHTML = ''
  for (let meme of memes) {
    memesHTML += 
    `<div class="meme">
      <a href="/getDetails?id=${meme.id}">
      <img class="memePoster" src="${meme.memeSrc}"/>          
    </div>`
  }

  fs.readFile('./views/viewAll.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.writeHead(200, {
      'content-type': 'text/html'
    })

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memesHTML)
    res.write(data)

    res.end()
  })
}

function viewAddMeme(req,res) {
  fs.readFile('./views/addMeme.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.writeHead(200, {
      'content-type': 'text/html'
    })

    res.write(data)
    res.end()
  })
}

function addMeme(req, res) {
  let form = new formidable.IncomingForm()
  
  form.parse(req, function(err, fields, files) {
    
    res.writeHead(200, {'content-type': 'text/plain'});
    
    res.write('received upload:\n\n');


    res.end(util.inspect({fields: fields, files: files}));
  })

  console.log(form)
}

function getDetails(req, res) {
  let id = url.parse(req.url)['query'].split('=')[1]
  let targetedMeme = dataBase.getById(id)

  let memeHTML = `
  <div class="content">
  <img src="${targetedMeme.memeSrc}" alt=""/>
  <h3>Title ${targetedMeme.title}</h3>
  <p> ${targetedMeme.description}</p>
  <button><a href="${targetedMeme.posterSrc}">Download Meme</a></button>
  </div>`;

  fs.readFile('./views/details.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.writeHead(200, {
      'content-type': 'text/html'
    })

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeHTML)
    res.write(data)

    res.end()
  })
}
