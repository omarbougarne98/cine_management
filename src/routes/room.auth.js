const express = require('express');
const authMiddelware = require('../middleware/authMiddleware');
const {getRoom, getAllRoom, addRoom, updateRoom, deleteRoom} = require('../controllers/roomController');

const router = express.Router();

router.get('/:id', getRoom);
router.get('/', getAllRoom);
router.post('/', authMiddelware, addRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;