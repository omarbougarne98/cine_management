const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

const MovieSchema = new mongoose.Schema({
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

const Movie = mongoose.model('Movie', MovieSchema);
const validateMovie = (movie) => {
    const schema = {
        name: Joi.string.min(5).max(50).required(),
        genre: Joi.string.min(5).max(50).required(),
        releaseYear: Joi.number().min(1888).required(),
        director: Joi.string.min(5).max(50).required(),
        image: Joi.string().optional(),
    }
    return Joi.validate(movie, schema)
}
module.exports = Movie;
exports.validate = validateMovie;
