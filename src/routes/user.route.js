const express = require('express');

const { addUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', addUser);
// router.post('/request-password-reset', requestPasswordReset);
// router.post('/reset-password', resetPassword);

module.exports = router;

