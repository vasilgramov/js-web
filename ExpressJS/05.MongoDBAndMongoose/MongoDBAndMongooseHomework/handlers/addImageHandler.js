const formidable = require('formidable')
const fs = require('fs')

const Image = require('../models/ImageSchema')
const Tag = require('../models/TagSchema')

function getHome(res) {
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    let dispalyTags = ''
    Tag.find({}).then(tags => {
      for (let tag of tags) {
        dispalyTags += `<div class='tag' id="${tag._id}">${tag.tagName}</div>`
      }

      data = data
        .toString()
        .replace(`<div class='replaceMe'></div>`, dispalyTags)
      res.end(data)
    })
  })
}

function addImage(req, res) {

  let form = new formidable.IncomingForm()
  form.parse(req, (err, fields, file) => {
    if (err) {  
      console.log(err)
      return
    }

    let tags = fields['tagsID'].split(',')
    tags.pop()
    fields['tags'] = tags

    delete fields['tagsID']

    Image.create(fields).then((image) => {
      
      // for (let tagId of image['tags']) {
      //   Tag.findByIdAndUpdate(tagId).then((tag) => {
      //     tag['images'].push(image['_id'])
          
      //     tag.save()
      //       .then((tag) => { })
      //       .catch((err) => { })
      //   })
      // }

      // getHome(res)

      Tag.update(
        { _id: { $in: fields['tags'] } },
        { $push: { images: image._id } },
        { multi: true }
      ).then((e) => {
        getHome(res)
      }).catch((err) => {
        console.log(err)
      })

    })
  })
}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}
