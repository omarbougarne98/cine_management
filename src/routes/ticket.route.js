
const express = require('express');
const {createTicket} = require('../controllers/ticketController');
const authMiddelware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', authMiddelware, createTicket);

module.exports = router;
