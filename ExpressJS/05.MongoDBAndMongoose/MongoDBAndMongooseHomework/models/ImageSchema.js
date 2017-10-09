const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let ImageSchema = new mongoose.Schema({
    imageUrl: { type: String, require: true },
    imageTitle: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    description: { type: String, required: true },
    tags: [{
        type: ObjectId,
        ref: 'Tag'
    }]
})

module.exports = mongoose.model('Image', ImageSchema)