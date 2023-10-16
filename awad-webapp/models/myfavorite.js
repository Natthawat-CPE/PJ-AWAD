const mongoose = require('mongoose');

const myfavoriteSchema = new mongoose.Schema({
    P_Id: {
        type: String,
        required: true
    },
    P_Name: {
        type: String,
        required: true
    },
    P_Prefix: {
        type: String,
        required: true
    },
    U_Id: {
        type: String,
        required: true
    }
}, { collection: 'my_favorites' })

module.exports = mongoose.model('MyFavorite', myfavoriteSchema)