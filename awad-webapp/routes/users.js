const expressFunction = require('express')
const router = expressFunction.Router()
const User = require('../models/user')
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
        var new_user = new User({
            User_Name: dataUser.User_Name,
            Password: dataUser.Password
        });
        new_user.save().then( result => {
            resolve({message: 'Signin up successfully'});
        }).catch(err => {
            reject(new Error('Cannot insert user to DB!'));
        })
    });
}

const findUser = (User_Name) => {
    return new Promise((resolve, reject) => {
        User.findOne({User_Name: User_Name}).then(data => {
            if (data) {
                resolve({id: data._id, User_Name: data.User_Name, Password: data.Password});
            } else {
                reject(new Error('Cannot find username!'));
            }
        }).catch( err => {
            reject(new Error('Cannot find username!'));
        })
    });
}

async function getUser(req, res, next) {
    let user
    try{
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

router.post('/signin', async (req, res) => {
    const playload = {
        User_Name: req.body.User_Name,
        Password: req.body.Password
    };

    try {
        const result = await findUser(playload.User_Name);
        const loginStatus = await compareHash(playload.Password, result.Password);

        const status = loginStatus.status;
        if(status) {
            const token = jwt.sign(result, key, {expiresIn: 60*60});
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
                User_Name: req.body.User_Name,
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
