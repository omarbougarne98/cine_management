const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

const sessionSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    movieTime: {
        type: Date,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);

const validateSession = (session) => {
    const schema = Joi.object({
        movie: Joi.string().required(),
        room: Joi.string().required(),
        movieTime: Joi.date().required(),
        availableSeats: Joi.number().integer().min(0).required()
    });
    
    return schema.validate(session);
};

module.exports = {
    Session,
    validateSession
};
