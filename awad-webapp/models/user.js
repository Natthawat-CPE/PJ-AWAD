const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    User_Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
}, { collection: 'users' })

module.exports = mongoose.model('User', userSchema)