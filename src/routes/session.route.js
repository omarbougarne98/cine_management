const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {addSession} = require('../controllers/sessionController');

const router = express.Router();

router.post('/', authMiddleware, addSession);


module.exports = router;

