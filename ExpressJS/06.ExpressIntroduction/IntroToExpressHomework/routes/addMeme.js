const express = require('express')
const router = express.Router()

const Meme = require('../models/Meme')
const Genre = require('../models/Genre')

router.get('/', function (req, res, next) {
  
  Genre.find({}).then((genres) => {
    res.render('addMeme', { genres })
  })
}).post('/', function (req, res, next) {
  
  console.log(req.body)

  Meme.create(req.body).then((meme) => {
    // Genre.findById(req.)
  })
})

module.exports = router
