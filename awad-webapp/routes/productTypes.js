const expressFunction = require('express')
const router = expressFunction.Router()
const ProductType = require('../models/productType')
const authorization = require('../config/authorize')
const checkUserRole = require('../config/userrole')

// Getting all
router.get('/get', authorization, checkUserRole('Admin', 'User'), async (req, res) => {
    try {
        const productTypes = await ProductType.find()
        res.status(200).json(productTypes);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Getting One
router.get('/get/:id', authorization, checkUserRole('Admin', 'User'), getProductType, (req, res) => {
    res.json(res.productType);
    //res.send(res.productType.ProductType_Name)
});

// Creating One
router.post('/create', authorization, checkUserRole('Admin'), async (req, res) => {
    const productType = new ProductType({
        ProductType_Name: req.body.ProductType_Name
    })
    try {
        const newProductType = await productType.save();
        res.status(201).json(newProductType);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Updating One
router.patch('/patch/:id', authorization, checkUserRole('Admin'), getProductType, async (req, res) => {
    if (req.body.ProductType_Name != null) {
        res.productType.ProductType_Name = req.body.ProductType_Name
    }

    try {
        const updateProductType = await res.productType.save();
        res.json(updateProductType);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Deleting One
router.delete('/delete/:id', authorization, checkUserRole('Admin'), getProductType, async (req, res) => {
    try {
        await res.productType.deleteOne()
        res.json({ message: "Deleted ProductType" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getProductType(req, res, next) {
    let productType
    try{
        productType = await ProductType.findById(req.params.id)
        if (productType == null) {
            return res.status(404).json({ message: 'Cannot find productType'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.productType = productType
    next()
}

module.exports = router