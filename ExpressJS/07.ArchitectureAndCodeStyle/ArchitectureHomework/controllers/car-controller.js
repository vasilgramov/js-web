const Car = require('mongoose').model('Car')
const User = require('mongoose').model('User')

module.exports = {
    addCarGet: (req, res) => {
        res.render('car/addCarView')
    },
    addCarPost: (req, res) => {
        let car = createCar(req.body)
        Car.create(car, function (err, car) {
            if (err) {
                console.log(err)
                return
            }

            res.redirect('/')
        })
    },
    viewAll: (req, res) => {
        Car.find({}).then((cars) => {
            cars = cars.filter(c => c.isRented === false)

            res.render('car/all', { cars })            
        })
    },
    rent: (req, res) => {
        let id = req.params.id;

        Car.findById(id, (err, car) => {
            if (err) {
                console.log(err)
                return
            }

            car.isRented = true
            car.save((err) => {
                User.findById(res.locals.currentUser._id, (err, user) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                  
                    user.cars.push(car)
                    user.save((err) => {
                        if (err) {
                            console.log(err)
                            return
                        }

                        res.redirect('/allCars')                                            
                    })
                })
            })
        })
    }
}

function createCar(object) {
    return {
        brand: object['brand'],
        model: object['model'],
        year: Number(object['year']),
        image: object['image']   
    }
}