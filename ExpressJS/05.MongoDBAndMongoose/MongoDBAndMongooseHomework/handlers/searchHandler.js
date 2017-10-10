const formidable = require('formidable')
const fs = require('fs')

const Image = require('../models/ImageSchema')
const Tag = require('../models/TagSchema')

module.exports = (req, res) => {
  if (req.pathname === '/search') {

    let constraints = req.pathquery

    constraints['tagName'] = constraints['tagName'].split(', ')

    Tag.find(
      { tagName: { $in: constraints['tagName'] } },
      { multi: true }
    ).then((tags) => {

      Image.find({}).then((images) => {
      
        let found = []
        for (let img of images) {
          if (Number(constraints['Limit']) <= found.length) break

          if (hasRequirements(img, tags, constraints)) {
            found.push(img)
          }
        }

        console.log(found)

        let string = ''
        for (let image of found) {
          string += 
          `<fieldset id => <legend>${image.imageTitle}:</legend> 
          <img src="${image.imageUrl}">
          </img><p>${image.description}<p/>
          <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
          </button> 
          </fieldset>`
        }

        fs.readFile('/home/vladix/Programmig/JSWeb/ExpressJS/05.MongoDBAndMongoose/MongoDBAndMongooseHomework/views/results.html', (err, data) => {
          if (err) {
            console.log(err)
            return
          }

          data = data.toString().replace("<div class='replaceMe'></div>", string)
          res.writeHead(200, {
            'content-type': 'text/html'
          })

          res.write(data)
          res.end()
        })

      })
    })
  } else {
    return true
  }
}

function hasRequirements(image, tags, requirements) {
  let result = new Date(image['creationDate']) >= new Date(requirements['afterDate']) && 
    new Date(image['creationDate']) <= new Date(requirements['beforeDate']) 
    
  if (result === false) return false

  for (let tagId of image['tags']) {
    if (includes(tagId, tags)) {
      return true
    }
  }

  return false
}

function includes(tagId, tags) {
  for (let id of tags) {
    console.log(id['_id'])
    console.log(tagId)
    
    if (id['_id'] == tagId) return true
  }

  return false
}
