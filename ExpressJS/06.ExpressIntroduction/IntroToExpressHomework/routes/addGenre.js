const express = require('express')
const router = express.Router()

const Genre = require('../models/Genre')

router.get('/', function (req, res, next) {
  res.render('addGenre')
})

router.post('/', function (req, res, next) {
  Genre.create(req.body)
    .then(res.redirect('/'))
})

module.exports = router
