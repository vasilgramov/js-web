const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    size: { type: Number, required: true, min: 17, max: 24 },
    toppings: [{
        type: String,
        default: []
    }]
})

module.exports = mongoose.model('Product', productSchema)