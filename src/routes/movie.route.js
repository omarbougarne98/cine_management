const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {getMovie, getAllMovies, addMovie, updateMovie, deleteMovie} = require('../controllers/movieController');

const router = express.Router();

router.get('/',  getAllMovies);
router.get('/:id',  getMovie);
router.post('/movie', authMiddleware, addMovie);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);




module.exports = router;



