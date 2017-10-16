const express = require('express')
const router = express.Router()

const Meme = require('../models/Meme')

router.get('/', function(req, res, next) {
  Meme.find({}).then((memes) => {
    res.render('viewAll', { memes })    
  })
})

module.exports = router
