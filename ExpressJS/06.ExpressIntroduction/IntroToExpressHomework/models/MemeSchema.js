const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let memeSchema = new mongoose.Schema({
    memeName: { type: String, required: true },
    dateOfCreation: { type: Date, default: Date.now() },
    votes: { type: Number },
    description: { type: String, required: true },
    title: { type: String, required: true }
})

module.exports = mongoose.model('Meme', memeSchema)