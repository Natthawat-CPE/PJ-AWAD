const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
    ProductType_Name: {
        type: String,
        required: true
    }
}, { collection: 'product_types' })

module.exports = mongoose.model('ProductType', productTypeSchema)