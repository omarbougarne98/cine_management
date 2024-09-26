const { Movie, validate } = require('../models/movieModel'); 


const getMovie = async  (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('Cannot find movie try again')
        res.send(movie);
    
};

    const getAllMovies = async (req, res) =>{
        const movies = await Movie.find();
        res.send(movies)
    }

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

    const updateMovie = async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(442).send(error.details[0].message);
        const movie = await Movie.findAndUpdateById(
            req.params.id,
            {
                name: req.body.name,
                genre: req.body.genre,
                director: req.bodydirextor,
                releaseYear: req.body.releaseYear,
                image: req.body.image
            },
            { new: true }
        );
        if(!movie) return res.status(442).send(error.details[0].message);
        res.send(movie);
    }

    const deleteMovie = async (req, res) => {
        const movie =await Movie.findByIdAndDelete(req.params.id);
        if(!movie) return res.status(422).send(error.details[0].message)
    }




module.exports = {
    getAllMovies,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie
};
