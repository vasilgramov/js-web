const User = require('../models/User')

module.exports = {
    index: (req, res) => {
        let error = req.query.error
        if (error) {
            res.render('home/index', { error })
            return
        }

        if (req.user) {
            User.findById(req.user._id)
                .sort({ dateCreated: -1 })
                .populate('otherUsers')
                .then((user) => {
                    let users = user.otherUsers
                    res.render('home/index', { users })
                });

            return
        }

        res.render('home/index');
    }
};