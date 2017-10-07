const mongoose = require('mongoose')
const connection = 'mongodb://localhost:27017/unidb'

let Student = mongoose.model('Student', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    facultyNumber: { type: String, required: true, unique: true },
    age: { type: Number }
})

mongoose.connect(connection).then(() => {
let firstStudent = new Student({ firstName: 'Kiril', lastName: 'Kirilov', facultyNumber: '13738'})
firstStudent.save()
    .then((sInfo) => console.log(sInfo))
    .catch((err) => console.warn(err))
})