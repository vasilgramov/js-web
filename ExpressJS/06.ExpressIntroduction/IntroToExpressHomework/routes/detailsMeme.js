const express = require('express')
const router = express.Router()

const Meme = require('../models/Meme')

router.get('/', function (req, res, next) {
    Meme.findById(req.query.id, function (err, meme) {
        if (err) {
            console.log(err)
            return
        }

        console.log(meme)

        res.render('detailsMeme', { meme })
    })
})

module.exports = router
