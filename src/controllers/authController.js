
const User = require('../models/userModel'); 
const bcrypt = require('bcrypt');

const login = async (req, res ,next) => {
    const {error} = validate (req.body);
    
    if(error) return res.status(422).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email}, 'email').exec();
    if(!user) return res.status(404).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(404).send("Ivalid email or password");

    const token = user.genrateAuthToken();
    res.send(token);
}

const validateUser = (req) => {
    const schema = {
        email: Joi.string().min(5).max(50).required.email(),
        password: Joi.string().min(5).max(24).required
    }

    return Joi.validateUser(req, schema);
}

module.exports = {
    login,
    validateUser
}