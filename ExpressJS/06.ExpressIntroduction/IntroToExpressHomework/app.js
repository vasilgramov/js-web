const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

//====================================

const index = require('./routes/index')
const addMeme = require('./routes/addMeme')
const addGenre = require('./routes/addGenre')
const viewAllMemes = require('./routes/viewAllMemes')
const searchMeme = require('./routes/searchMeme')

//====================================

require('./config/database')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//====================================



app.use('/', index)
app.use('/addMeme', addMeme)
app.use('/addGenre', addGenre)
app.use('/viewAllMemes', viewAllMemes)
app.use('/searchMeme', searchMeme)


//====================================

app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
