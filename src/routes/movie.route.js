const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {addMovie} = require('../controllers/movieController');

const router = express.Router();

router.post('/movie', authMiddleware, addMovie);

module.exports = router;