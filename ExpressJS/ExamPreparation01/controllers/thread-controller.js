const Thread = require('mongoose').model('Thread')
const Message = require('mongoose').model('Message')
const User = require('mongoose').model('User')

const messageUtil = require('../util/message-util')

module.exports = {
    getChatRoom: (req, res) => {
        let currentUser = req.user.username
        let otherUser = req.params.username

        Thread.findOne({
            users: { $all: [currentUser, otherUser] }
        }).then(thread => {
            if (!thread) {
                res.redirect('/?error=Thread no longer exists!')
                return
            }

            let data = { thread }


            Message.find({ thread: thread._id })
                .sort({ dateCreated: 1 })
                .populate('user')
                .then(messages => {
                    data.messages = messages

                    User.findOne({ username: otherUser }).then((secondUser) => {
                        if (!secondUser) {
                            res.redirect('/?error=User not found')
                            return
                        }

                        if (secondUser.blockedUsers.indexOf(req.user._id) !== -1) {
                            data.blocked = true
                        }

                        res.render('thread/chat-room', data)
                    })
                })
        })
    },
    postMessage: (req, res) => {
        let currentUser = req.user.username
        let otherUser = req.params.username
        
        let content = req.body.content

        Thread.findOne({
            users: { $all: [currentUser, otherUser] }
        }).then((thread) => {
            if (!thread) {
                res.redirect('/?error=Thread no longer exists!')
                return
            }

            let message = {
                content: content,
                user: req.user._id,
                thread: thread._id,
                dateCreated: Date.now(),
                isLink: messageUtil.isLink(content),
                hasImage: messageUtil.hasImage(content)
            }

            Message.create(message, function (err, message) {
                if (err) {
                    console.log(err)
                    return
                }

                res.redirect(`/thread/${otherUser}`)
            })
        })
    }
}