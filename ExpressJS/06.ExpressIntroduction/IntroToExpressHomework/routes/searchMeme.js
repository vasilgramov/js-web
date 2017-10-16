const express = require('express')
const router = express.Router()

const Genre = require('../models/Genre')
const Meme = require('../models/Meme')

router.get('/', function (req, res, next) {
  

  if (req.query.memeTitle !== undefined) {

    Genre.findById(req.query.genreSelect).then((genre) => {
      let foundMemes = []    
      
      Meme.find({
        '_id': { $in:  genre.memes}
      }, function (err, memes) {
        for (let meme of memes) {
          if (meme.title.indexOf(req.query.memeTitle) >= 0) {
            foundMemes.push(meme)
          }
        }

        res.render('searchMeme', { foundMemes })
      })
    })
  } else {
    Genre.find({}).then((genres) => {
      res.render('searchMeme', { genres })
    }).catch((err) => console.log(err))
  }

})

module.exports = router
