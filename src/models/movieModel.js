const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: [true, "Please enter movie name"],
        
    },

    genre: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: [true, "Please enter genre"],
    },

    releaseYear: {
        type: Number,
        year: 1900,
        required: true
    },

    director: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true
    },
    
    image: {
        type: String,
        required: false,
    },

 },
    {
        timestamps: true
    });

const Movie = mongoose.model('Movie', movieSchema);
const validateMovie = (movie) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        genre: Joi.string().min(5).max(50).required(),
        releaseYear: Joi.number().min(1888).required(), 
        director: Joi.string().min(5).max(50).required(),
        image: Joi.string().optional(),
    });

    return schema.validate(movie); 
};

module.exports = {
    Movie,
    validate: validateMovie
}
