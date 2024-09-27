
const express = require('express');
const {addTicket} = require('../controllers/ticketController');
const authMiddelware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', authMiddelware, addTicket);

module.exports =router;