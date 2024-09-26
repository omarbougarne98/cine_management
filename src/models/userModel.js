const mongoose = require('mongoose');
const Joi = require('joi');
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
    }
});



userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'), 
    {expiresIn: "1h"}
); 
    return token;
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

module.exports = {
    User,         
    validateUserRegistration,
    validateUserLogin

};
