const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let genreSchema = new mongoose.Schema({
    genreName: { type: String, required: true },
    memes: [{
        type: Object,
        ref: 'Meme'
    }]
})

module.exports = mongoose.model('Genre', genreSchema)