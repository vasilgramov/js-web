const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    fromUser: { type: ObjectId, ref: 'User', required: true },
    productId: { type: ObjectId, ref: 'Product', required: true },
    selectedToppings: [{
        type: String,
        default: []
    }],
    status: { type: String, default: 'Pending' },
    date: { type: Date, required: true }
})

module.exports = mongoose.model('Order', orderSchema)