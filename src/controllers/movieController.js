const { Movie, validate } = require('../models/movieModel'); 

const addMovie = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(442).send(error.details[0].message);

    const movie = new Movie({
        name: req.body.name,
        genre: req.body.genre,
        director: req.body.director,
        releaseYear: req.body.releaseYear,
        image: req.body.image 
    });

    await movie.save();
    res.send(movie);
}

module.exports = {
    addMovie
};
