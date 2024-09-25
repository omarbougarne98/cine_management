const { User, validateUser } = require('../models/userModel'); // Destructured import
const bcrypt = require('bcrypt');
const _ = require('lodash'); 

const addUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(422).send(error.details[0].message); 

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User with this email already exists.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save(); 

    const token = user.generateAuthToken(); 
    
    res.header("x-auth-token", token).send({
        token, 
        user: _.pick(user, ['_id', 'name', 'email'])
    });
};

module.exports = {
    addUser
};
