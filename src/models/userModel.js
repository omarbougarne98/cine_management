const mongoose = require('mongoose');
const Joi = require('joi');
const crypto = require('crypto');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'), {expiresIn: "1h"});
    return token;
};


userSchema.methods.generatePasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; 
    return resetToken;
};

const User = mongoose.model('User', userSchema);

const validateUserRegistration  = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(user); 
};

const validateUserLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(24).required()
    });
    return schema.validate(user); 
};

const validatePasswordReset = (data) => {
    const schema = Joi.object({
        password: Joi.string().min(5).max(1024).required(),
        token: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = {
    User,         
    validateUserRegistration,
    validateUserLogin,
    validatePasswordReset
};
