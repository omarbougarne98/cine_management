const { User, validateUserRegistration } = require('../models/userModel'); 
const bcrypt = require('bcrypt');
const _ = require('lodash'); 


const addUser = async (req, res) => {
    try {
        const { error } = validateUserRegistration(req.body);
        if (error) {
            return res.status(422).send(error.details[0].message);
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User with this email already exists.');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);


        await user.save(); 
        
        res.status(201).send( _.pick(user, ['_id', 'name', 'email']));

} catch (err) {
        console.error('Unexpected Error:', err);
        res.status(500).send('Internal server error');
    }
};
module.exports = {
    addUser
};

// const token = user.generateAuthToken(); 
// res.header("x-auth-token", token).send({
//     token, 