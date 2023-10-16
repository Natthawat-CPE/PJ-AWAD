const expressFunction = require('express')
const router = expressFunction.Router()
const Admin = require('../models/admin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = 'MY_KEY';

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const compareHash = async(plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if (err) {
                reject(new Error('Error bcrypt compare'))
            } else {
                resolve({status: data});
            }
        })
    });
}

const insertUser = (dataUser) => {
    return new Promise ((resolve, reject) => {
        var new_user = new Admin({
            Admin_Name: dataUser.Admin_Name,
            Password: dataUser.Password
        });
        new_user.save().then( result => {
            resolve({message: 'Signin up successfully'});
        }).catch(err => {
            reject(new Error('Cannot insert user to DB!'));
        })
    });
}

const findUser = (Admin_Name) => {
    return new Promise((resolve, reject) => {
        Admin.findOne({Admin_Name: Admin_Name}).then(data => {
            if (data) {
                resolve({id: data._id, Admin_Name: data.Admin_Name, Password: data.Password});
            } else {
                reject(new Error('Cannot find adminname!'));
            }
        }).catch( err => {
            reject(new Error('Cannot find adminname!'));
        })
    });
}

async function getAdmin(req, res, next) {
    let admin
    try{
        admin = await Admin.findById(req.params.id)
        if (admin == null) {
            return res.status(404).json({ message: 'Cannot find admin'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.admin = admin
    next()
}

router.post('/signin', async (req, res) => {
    const playload = {
        Admin_Name: req.body.Admin_Name,
        Password: req.body.Password
    };

    try {
        const result = await findUser(playload.Admin_Name);
        const loginStatus = await compareHash(playload.Password, result.Password);

        const status = loginStatus.status;
        const token = jwt.sign(result, key, {expiresIn: 60*5});
        console.log(jwt.verify(token, key).Admin_Name);
        if(status) {
            const token = jwt.sign(result, key, {expiresIn: 60*5});
            console.log();
            res.status(200).json({result, token, status});
        } else {
            res.status(200).json({status});
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post('/signup', async (req, res) => {
    makeHash(req.body.Password)
        .then(hashText => {
            const playload = {
                Admin_Name: req.body.Admin_Name,
                Password: hashText,
            }
            insertUser(playload)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(400).json({ message: err.message});
                })
        })
        .catch(err => {
            res.status(400).json({ message: err.message});
            })
});

module.exports = router
