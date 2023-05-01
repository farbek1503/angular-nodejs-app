const router = require('express').Router();
const bcrypt = require('bcryptjs');

const verifyToken = require('../middleware/verifyToken');
const UserModelSchema = require('../models/UserModel');
const CardModelSchema = require('../models/CardModel');

router.get('/settings', verifyToken, async(req, res) => {
    const id = req.userId;
    const user = await UserModelSchema.findById(id);

    res.json({
        data: user
    })
})

router.get('/get-my-card', verifyToken, async(req, res) => {
    const id = req.userId;
    const myCard = await CardModelSchema.find({
        user_id: id
    });
	
    res.json({
        data: myCard
    })
})

router.post('/edit-user', verifyToken, async(req, res) => {
    const {
        firstName,
        lastName,
        email
    } = req.body;
    const id = req.userId;

    const user = await UserModelSchema.findByIdAndUpdate(id, req.body, {
        new: true
    });
    console.log('update user', user)

    res.json({
        data: user
    })
})

router.post('/edit-password', verifyToken, async(req, res) => {
    const {
        oldPassword,
        newPassword
    } = req.body;
    const id = req.userId;

    const user = await UserModelSchema.findById(id);
    const comPass = await bcrypt.compare(oldPassword, user.password);
    if (comPass == false) {
        res.json({
            data: 'password false'
        })
        return
    }

    const salt = await bcrypt.genSalt(10);
    const newPassHash = await bcrypt.hash(newPassword, salt);
    console.log('hash Pass', newPassHash)
    const userHash = await UserModelSchema.findByIdAndUpdate(id, {
        password: newPassHash
    }, {
        new: true
    })
        res.json({
            data: userHash
        })
})

module.exports = router
