const encryption = require('../util/encryption')

const User = require('mongoose').model('User')
const Thread = require('mongoose').model('Thread')

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register')
    },
    registerPost: async (req, res) => {
        const reqUser = req.body
        const salt = encryption.generateSalt()
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password)
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
            })
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err
                    res.render('user/register', user)
                } else {
                    res.redirect('/')
                }
            })
        } catch (e) {
            console.log(e)
            res.locals.globalError = e
            res.render('user/register')
        }
    },
    logout: (req, res) => {
        req.logout()
        res.redirect('/')
    },
    loginGet: (req, res) => {
        res.render('user/login')
    },
    loginPost: async (req, res) => {
        const reqUser = req.body
        try {
            const user = await User.findOne({ username: reqUser.username })

            if (!user) {
                errorHandler('Invalid user data')
                return
            }

            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data')
                return
            }

            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err)
                } else {
                    res.redirect('/')
                }
            })
        } catch (e) {
            errorHandler(e)
        }

        function errorHandler(e) {
            console.log(e)
            res.locals.globalError = e
            res.render('user/login')
        }
    },
    findUser: (req, res) => {
        let currentUsername = res.locals.user.username
        let searchedUsername = req.query.username

        if (currentUsername === searchedUsername) {
            res.redirect('/?error=Cannot chat with yourself!')
            return
        }

        User.findOne({ username: searchedUsername }, function (err, user) {
            if (err) {
                res.redirect(`/?error=${err}`)
            }

            if (!user) {
                res.redirect('/?error=User does not exist')
                return
            }

            Thread.findOne({ users: { $all: [currentUsername, searchedUsername] } })
                .then(thread => {
                    if (!thread) {
                        Thread.create({ users: [currentUsername, searchedUsername] })
                            .then(thread => {
                                user.otherUsers.push(req.user._id)
                                req.user.otherUsers.push(user._id)
                                Promise.all([user.save(), req.user.save()])
                            })
                    }

                    res.redirect(`/thread/${user.username}`)
                })
        })
    },
    blockUser: (req, res) => {
        let userIdToBlock = req.params.id

        User.findById(userIdToBlock, function (err, user) {
            if (err) {
                console.log(err)
                return
            }

            if (!user) {
                res.redirect('/?error=User with that id does not exist')
                return
            }


            
            req.user.blockedUsers.push(user._id)
            req.user.save((err) => {
                if (err) {
                    console.log(err)
                    return
                }

                res.redirect('/')
            })
        })  
    },
    unblockUser: (req, res) => {
        let userIdToUnblock = req.params.id

        User.findById(userIdToUnblock, function (err, user) {
            if (err) {
                console.log(err)
                return
            }

            if (!user) {
                res.redirect('/?error=User with that id does not exist')
                return
            }

            req.user.blockedUsers.pull(user._id)
            req.user.save((err) => {
                if (err) {
                    console.log(err)
                    return
                }

                res.redirect('/')
            })
        })  
    }
}