const { User, validateUserLogin  } = require('../models/userModel'); 
const bcrypt = require('bcrypt');
const Joi = require('joi');

const login = async (req, res, next) => {
  try {
    const { error } = validateUserLogin (req.body);
    if (error) return res.status(422).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).send('Invalid email or password');

    const token = user.generateAuthToken(); 
    res.send({ token });
  } catch (err) {
    console.error('Unexpected Error:', err); 
    res.status(500).send('Internal server error'); 
  }
};



module.exports = {
  login,
  validateUserLogin ,
};
