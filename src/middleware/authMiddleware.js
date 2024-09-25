const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/userModel'); 

const auth = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send({ error: "Access denied No token" });
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decode;

        
        next();
    } catch (error) {
        res.status(400).send({ error: "Invalid Token" });
    }
};

module.exports = auth;
