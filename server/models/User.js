
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    profileImage: {
        type: String,        
        default: './src/assets/default.png'
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    accountConfirmed: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
    },
    facebookId: String,
    hash: String,
    salt: String,
    confirmEmailToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date    
});

userSchema.methods.setConfirmEmailToken = function () {
    this.confirmEmailToken = crypto.randomBytes(16).toString('hex');
};

userSchema.methods.setPassword = function (password) {
    if (password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    }
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    var token = jwt.sign({
        _id: this._id,
        profileImage: this.profileImage,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        accountConfirmed: this.accountConfirmed,
        userType: this.userType,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET || "MY_SECRET");
    return token;
};

module.exports = mongoose.model('User', userSchema);