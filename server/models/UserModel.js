const mongoose = require("mongoose");

const UserModelSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: true
    },
    lastName: {
        type: String,
		minlength: 5,
        maxlength: 25,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    brithday: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
		minlength: 8,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserModelSchema);
