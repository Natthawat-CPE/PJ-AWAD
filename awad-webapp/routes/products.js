const expressFunction = require('express')
const router = expressFunction.Router()
const Product = require('../models/product')
const authorization = require('../config/authorize');
const checkUserRole = require('../config/userrole');

// Getting all
router.get('/get', authorization, checkUserRole('Admin', 'User'), async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Getting One
router.get('/get/:id', authorization, checkUserRole('Admin', 'User'), getProduct, (req, res) => {
    res.json(res.product);
});

// Creating One
router.post('/create', authorization, checkUserRole('Admin'), async (req, res) => {
    const product = new Product({
        Product_Name: req.body.Product_Name,
        Product_Type: req.body.Product_Type,
        Product_IsHot: req.body.Product_IsHot,
        Product_IsCold: req.body.Product_IsCold,
        Product_IsFrappe: req.body.Product_IsFrappe,
        Product_Detail_Hot: req.body.Product_Detail_Hot,
        Product_Price_Hot: req.body.Product_Price_Hot,
        Product_Img_Hot: req.body.Product_Img_Hot,
        Product_Detail_Cold: req.body.Product_Detail_Cold,
        Product_Price_Cold: req.body.Product_Price_Cold,
        Product_Img_Cold: req.body.Product_Img_Cold,
        Product_Detail_Frappe: req.body.Product_Detail_Frappe,
        Product_Price_Frappe: req.body.Product_Price_Frappe,
        Product_Img_Frappe: req.body.Product_Img_Frappe
    })
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Updating One
router.patch('/patch/:id', authorization, checkUserRole('Admin'), getProduct, async (req, res) => {
    if (req.body.Product_Name != null) {
        res.product.Product_Name = req.body.Product_Name
    }
    if (req.body.Product_Type != null) {
        res.product.Product_Type = req.body.Product_Type
    }
    if (req.body.Product_IsHot != null) {
        res.product.Product_IsHot = req.body.Product_IsHot
    }
    if (req.body.Product_IsCold != null) {
        res.product.Product_IsCold = req.body.Product_IsCold
    }
    if (req.body.Product_IsFrappe != null) {
        res.product.Product_IsFrappe = req.body.Product_IsFrappe
    }
    if (req.body.Product_Detail_Hot != null) {
        res.product.Product_Detail_Hot = req.body.Product_Detail_Hot
    }
    if (req.body.Product_Price_Hot != null) {
        res.product.Product_Price_Hot = req.body.Product_Price_Hot
    }
    if (req.body.Product_Img_Hot != null) {
        res.product.Product_Img_Hot = req.body.Product_Img_Hot
    }
    if (req.body.Product_Detail_Cold != null) {
        res.product.Product_Detail_Cold = req.body.Product_Detail_Cold
    }
    if (req.body.Product_Price_Cold != null) {
        res.product.Product_Price_Cold = req.body.Product_Price_Cold
    }
    if (req.body.Product_Img_Cold != null) {
        res.product.Product_Img_Cold = req.body.Product_Img_Cold
    }
    if (req.body.Product_Detail_Frappe != null) {
        res.product.Product_Detail_Frappe = req.body.Product_Detail_Frappe
    }
    if (req.body.Product_Price_Frappe != null) {
        res.product.Product_Price_Frappe = req.body.Product_Price_Frappe
    }
    if (req.body.Product_Img_Frappe != null) {
        res.product.Product_Img_Frappe = req.body.Product_Img_Frappe
    }

    try {
        const updateProduct = await res.product.save();
        res.json(updateProduct);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Deleting One
router.delete('/delete/:id', authorization, checkUserRole('Admin'), getProduct, async (req, res) => {
    try {
        await res.product.deleteOne()
        res.json({ message: "Deleted Product" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getProduct(req, res, next) {
    let product
    try{
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.product = product
    next()
}

module.exports = router