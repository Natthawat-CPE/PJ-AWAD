const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    Product_Name: {
        type: String,
        required: true
    },
    Product_Type: {
        type: String, 
        required: true,
    },
    Product_IsHot: {
        type: Boolean,
        required: true
    },
    Product_IsCold: {
        type: Boolean,
        required: true
    },
    Product_IsFrappe: {
        type: Boolean,
        required: true
    },
    Product_Detail_Hot: {
        type: String,
        required: true
    },
    Product_Price_Hot: {
        type: Number,
        required: true
    },
    Product_Img_Hot: {
        type: String,
        required: true
    },
    Product_Detail_Cold: {
        type: String,
        required: true
    },
    Product_Price_Cold: {
        type: Number,
        required: true
    },
    Product_Img_Cold: {
        type: String,
        required: true
    },
    Product_Detail_Frappe: {
        type: String,
        required: true
    },
    Product_Price_Frappe: {
        type: Number,
        required: true
    },
    Product_Img_Frappe: {
        type: String,
        required: true
    }
}, { collection: 'products' })

module.exports = mongoose.model('Product', productSchema)