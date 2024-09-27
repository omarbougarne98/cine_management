
const express = require('express');
const {createTicket, deleteTicket} = require('../controllers/ticketController');
const authMiddelware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', authMiddelware, createTicket);
// router.put('/:id', authMiddelware, updateTicket); ///////////to-Do
router.delete('/:id', authMiddelware, deleteTicket );

module.exports = router;
