const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    memes: [{
        type: ObjectId,
        ref: 'Meme'
    }]
})

module.exports = mongoose.model('Genre', genreSchema)