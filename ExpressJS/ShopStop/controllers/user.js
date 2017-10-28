const User = require('../models/User')
const encryption = require('../utilities/enctyption')

module.exports = {
    getRegister: getRegister,
    postRegister: postRegister,
    loginGet: loginGet,
    loginPost: loginPost
}

function getRegister(req, res) {
    res.render('user/register')
}

function postRegister(req, res) {
    let data = req.body

    if (!passwordsMatch(data)) {
        res.redirect('/?error=Passwords does not match!')
        return
    }

    let user = getUser(data)
    let salt = encryption.genereateSalt()
    user.salt = salt

    user.password = encryption.generateHashedPassword(user.salt, user.password)
    User.create(user, function (err, user) {
        if (err) {
            console.log(err)
            return
        }

        req.logIn(user, (err, user) => {
            if (err) {
                console.log(err)
                return
            }

            res.redirect('/')
        })
    })
}

function passwordsMatch(data) {
    return data.password === data.confirmedPassword
}

function getUser(data) {
    return {
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        age: Number(data.age),
        gender: data.gender
    }
}

function loginGet(req, res) {
    res.render('user/login')
}

function loginPost(req, res) {
    let body = req.body

    console.log(body)
}