const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    users: [{
        type: String,
        require: true
    }],
    dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Thread', threadSchema)