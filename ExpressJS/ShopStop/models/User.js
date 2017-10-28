const mongoose = require('mongoose')
const encryption = require('../utilities/enctyption')
const propertyIsRequired = '{0} is required.'

const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Username'),
        unique: true
    },
    password: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Password')
    },
    salt: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'First name')
    },
    lastName: {
        type: String,
        required: propertyIsRequired.replace('{0}', 'Last name')
    },
    age: {
        type: mongoose.Schema.Types.Number,
        min: [0, 'Age must be between 0 and 120'],
        max: [120, 'Age must be between 0 and 120']
    },
    gender: {
        type: mongoose.Schema.Types.String,
        enum: {
            values: ['Male', 'Female'],
            message: 'Gender should be either "Male" or "Female".'
        }
    },
    roles: [{
        type: String
    }],
    boughtProducts: [{
        type: ObjectId,
        ref: 'Product'
    }],
    createdProducts: [{
        type: ObjectId,
        ref: 'Product'
    }],
    createdCategories: [{
        type: ObjectId,
        ref: 'Category'
    }]
})

userSchema.method({
    authenticate: function (password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password)

        return hashedPassword === this.password
    }
})

const User = mongoose.model('User', userSchema)

User.seedAdminUser = async () => {
    try {
        let users = await User.find()
        if (users.length > 0) return

        const salt = encryption.genereateSalt()
        const hashedPass = encryption.generateHashedPassword(salt, '1')
        return User.create({
            username: 'admin',
            firstName: 'Vasil',
            lastName: 'Gramov',
            salt: salt,
            password: hashedPass,
            age: 20,
            gender: 'Male',
            roles: ['Admin']
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = User

