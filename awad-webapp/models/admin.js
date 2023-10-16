const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Admin_Name: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
}, { collection: 'admins' })

module.exports = mongoose.model('Admin', userSchema)