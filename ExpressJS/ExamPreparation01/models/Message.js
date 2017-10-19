const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: ObjectId, required: true, ref: 'User' },
    thread: { type: ObjectId, required: true, ref: 'Thread' },
    dateCreated: { type: Date, default: Date.now() },
    isLink: { type: Boolean, default: false },
    hasImage: { type: Boolean, default: false }
})

module.exports = mongoose.model('Message', messageSchema)