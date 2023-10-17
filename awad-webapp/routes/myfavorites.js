const expressFunction = require('express');
const router = expressFunction.Router();
const MyFavorite = require('../models/myfavorite');
const authorization = require('../config/authorize');

// Getting all
router.get('/get', authorization, async (req, res) => {
    try {
        const myfavorites = await MyFavorite.find()
        res.status(200).json(myfavorites);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Getting All By U_Id
router.get('/get/uid/:u_id', authorization, getMyFavoriteByUid, async (req, res) => {
    res.json(res.myfavorites);
});

// // Getting One By u_id, P_id, P_prefix for check pass favorite
// router.post('/get/statusMyFavorite', authorization, getMyFavoriteByF_name, async (req, res) => {
//     res.json(res.myfavorites);
// });

// Getting One
router.get('/get/:id', authorization, getMyFavoriteByF_id, (req, res) => {
    res.json(res.myfavorite);
});

// Creating One
router.post('/create', authorization, async (req, res) => {
    const myfavorite = new MyFavorite({
        P_Id: req.body.P_Id,
        P_Name: req.body.P_Name,
        P_Prefix: req.body.P_Prefix,
        U_Id: req.body.U_Id
    })
    try {
        const newMyFavorite = await myfavorite.save();
        res.status(201).json(newMyFavorite);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// Updating One
router.patch('/patch/:id', authorization, getMyFavoriteByF_id, async (req, res) => {
    if (req.body.P_Id != null) {
        res.myfavorite.P_Id = req.body.P_Id
    }
    if (req.body.P_Name != null) {
        res.myfavorite.P_Name = req.body.P_Name
    }
    if (req.body.P_Prefix != null) {
        res.myfavorite.P_Prefix = req.body.P_Prefix
    }
    if (req.body.Product_IsCold != null) {
        res.myfavorite.U_Id = req.body.U_Id
    }

    try {
        const updateMyFavorite = await res.myfavorite.save();
        res.json(updateMyFavorite);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Deleting One
router.delete('/delete/favorite', authorization, getMyFavoriteByF_name, async (req, res) => {
    try {
        await res.myfavorite.deleteOne()
        res.json({ message: "Deleted Product" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.delete('/delete/:id', authorization, getMyFavoriteByF_id, async (req, res) => {
    try {
        await res.myfavorite.deleteOne()
        res.json({ message: "Deleted Product" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getMyFavoriteByF_id(req, res, next) {
    let myfavorite
    try{
        myfavorite = await MyFavorite.findById(req.params.id)
        if (myfavorite == null) {
            return res.status(404).json({ message: 'Cannot find myfavorite'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.myfavorite = myfavorite
    next()
}

async function getMyFavoriteByF_name(req, res, next) {
    let myfavorite
    try{
        myfavorite = await MyFavorite.findOne({P_Id: req.body.P_Id, P_Prefix: req.body.P_Prefix, U_Id:req.body.U_Id})
        if (myfavorite == null) {
            return res.status(404).json({ message: 'Cannot find myfavorite'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.myfavorite = myfavorite
    console.log(myfavorite);
    next()
}

async function getMyFavoriteByUid(req, res, next) {
    let myfavorites
    try{
        myfavorites = await MyFavorite.find({U_Id: req.params.u_id})
        if (myfavorites == null) {
            return res.status(404).json({ message: 'Cannot find myfavorites'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.myfavorites = myfavorites
    next()
}

module.exports = router

