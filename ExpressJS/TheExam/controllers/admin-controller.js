const Product = require('mongoose').model('Product')
const Order = require('mongoose').model('Order')

module.exports = {
    getCreateProduct: (req, res) => {
        res.render('admin/create-product')
    },
    postCreateProduct: (req, res) => {

        let toppings = getTopings(req.body.toppings)

        let product = {
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            size: Number(req.body.size),
            toppings: toppings
        }

        Product.create(product, function (err, product) {
            if (err) {
                console.log(err)
                return
            }

            res.redirect('/')
        })
    },
    allOrdersGet: (req, res) => {
        Order.find({}).populate('productId').then((orders) => {

            for (let order of orders) {
                getStatus(order)
            }

            res.render('order/all-orders', { orders })
        })
    },
    allOrdersPost: (req, res) => {
        Order.find({
            '_id': { $in: req.body.orderId }
        }, function (err, orders) {
            for (let i = 0; i < orders.length; i++) {
                orders[i].status = req.body.status[i]
            }

            let promises = []

            for (let order of orders) {
                promises.push(order.save())
            }

            Promise.all(promises).then(() => {
                res.redirect('/allOrders')
            }).catch((err) => {
                console.log(err)
            })
        })
    }
}

function getTopings(toppings) {
    if (!toppings) return []

    if (typeof toppings === 'string') {
        let toppingsArr = []
        toppingsArr.push(toppings)

        return toppingsArr
    }

    return toppings
}

function getStatus(order) {
    if (order.status === 'Pending') {
        order.pending = true
    } else if (order.status === 'In Progress') {
        order.inProgress = true
    } else if (order.status === 'In transit') {
        order.inTransit = true
    } else if (order.status === 'Delivered') {
        order.delivered = true
    }
}