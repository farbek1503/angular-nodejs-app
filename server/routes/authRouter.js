const router = require('express').Router();
const bcrypt = require('bcryptjs');

const generateJWT = require('../service/signToken');
const UserModelSchema = require('../models/UserModel');

router.post('/login', async(req, res) => {
    const {
        email,
        password
    } = req.body;

    const existUser = await UserModelSchema.findOne({
        email
    });
    if (!existUser) {
        res.json({
            data: 'User Not Found'
        })
        return
    }

    const comPass = await bcrypt.compare(password, existUser.password);
    if (!comPass) {
        res.json({
            data: 'Password Wrong'
        })
        return
    }
    console.log('existUser', existUser)
    const token = generateJWT(existUser._id);
    res.json({
        data: existUser,
        token
    })
})

router.post('/register', async(req, res) => {
    const {
        firstName,
        lastName,
        gender,
        brithday,
        email,
        password
    } = req.body;

    const isEmail = await UserModelSchema.findOne({
        email
    });

    if (isEmail) {
        res.json({
            data: 'This User Exists'
        })
        return
    }
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(password, salt).then(hashPass => {
        req.body.password = hashPass
    })

    await UserModelSchema.create(req.body).then(userData => {
        console.log('register data', userData)
        const token = generateJWT(userData._id);
        console.log('token', token)
        res.json({
            data: userData,
            token
        })
    }).catch(err => {
        console.log('register error', err)
        res.json({
            data: err
        })
    })
})

module.exports = router
