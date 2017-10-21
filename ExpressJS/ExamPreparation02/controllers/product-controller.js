const Product = require('mongoose').model('Product')
const Order = require('mongoose').model('Order')

module.exports = {
    getOrder: (req, res) => {
        let id = req.params.id

        Product.findById(id, function (err, product) {
            if (err) {
                console.log(err)
                return
            }

            res.render('order/customize-order', { product: product })
        })
    },
    postOrder: (req, res) => {
        let userId = req.user._id
        let productId = req.params.id

        let toppings = getSelectedToppings(req.body)

        let order = {
            fromUser: userId,
            productId: productId,
            selectedToppings: toppings,
            date: Date.now()
        }

        Order.create(order, function (err, order) {
            if (err) {
                console.log(err)
                return
            }

            res.redirect('/')
        })
    },
    myOrders: (req, res) => {
        let currentUserId = req.user._id

        Order.find({ fromUser: currentUserId }).populate('productId').then((orders) => {
            res.render('order/my-orders', { orders })
        })
    },
    orderDetails: (req, res) => {
        let orderId = req.params.id

        Order.findOne({ _id: orderId }).populate('productId').then((order) => {  

            getStatus(order)

            res.render('order/order-details.hbs', { order })   
        })         
    }
}


function getSelectedToppings(obj) {
    let toppings = []
    for (let key in obj) {
        toppings.push(key)
    }

    return toppings
}

function getStatus(order) {
    if (order.status === 'Pending') {
        order.pending = true
    } else if (order.status === 'In Progress') {
        order.inProgress = true
    } else if (order.status === 'In Transit') {
        order.inTransit = true
    } else if (order.status === 'Delivered') {
        order.delivered = true
    }
}


