const express = require('express')
const router = express.Router()

const Meme = require('../models/Meme')
const Genre = require('../models/Genre')

router.get('/', function (req, res, next) {

  Genre.find({}).then((genres) => {
    res.render('addMeme', { genres })
  })
}).post('/', function (req, res, next) {

  if (isEmpty(req.files)) {
    // when no picture is uploaded
    res.redirect('/addMeme')
    return
  }

  Meme.create(req.body).then((meme) => {

    req.files.name.mv(`./public/images/${meme._id + ''}.jpg`, (err) => {
      if (err) {
        console.log(err)
        return
      }

      Genre.findById(req.body.genreSelect, (err, genre) => {
        genre.memes.push(meme)        
        genre.save((err) => {
          if (err) {
            console.log(err)
            return
          }

          res.redirect('/')
        })
      })
    })
  }).catch((err) => {
    
    console.log(err)  
  })
})

function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }

  return true;
}

module.exports = router
