const { User, validateUserRegistration, validatePasswordReset } = require('../models/userModel'); 
const bcrypt = require('bcrypt');
const _ = require('lodash'); 
const crypto = require('crypto');
const config = require('config');
const nodemailer = require('nodemailer');


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


const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found.');

        
        const resetToken = user.generatePasswordResetToken();
        await user.save();

        
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.get('emailUsername'),
                pass: config.get('emailPassword')
            }
        });

        const resetUrl = `http://localhost}/api/users/reset-password/${resetToken}`;


        const message = `You have requested to reset your password. Please click the following link to reset your password: \n\n ${resetUrl}`;
        
        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset',
            text: message
        });

        res.send('Password reset email sent.');
    } catch (err) {
        console.error('Error requesting password reset:', err);
        res.status(500).send('Internal server error.');
    }
};


const resetPassword = async (req, res) => {
    try {
        const { password, token } = req.body;
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        
        
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).send('Invalid or expired token.');

        
        const { error } = validatePasswordReset({ password, token });
        if (error) return res.status(422).send(error.details[0].message);

        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.send('Password has been updated successfully.');
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).send('Internal server error.');
    }
};

module.exports = {
    addUser,
    requestPasswordReset,
    resetPassword
}