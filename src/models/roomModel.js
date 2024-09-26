const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');


const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            enum: ['Imax', '3D', '4D', '5D'],
            required: true
        },

        numberOfSeats: {
            type: Number,
            required: true
        },

        availability: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    });

    const Room = mongoose.model('Room', roomSchema);
    const validateRoom = (room) => {
        const schema = Joi.object({
            name: Joi.string().valid('Imax', '3D', '4D', '5D').required(),
            numberOfSeats: Joi.number().integer().min(1).max(100).required(),
            availability: Joi.boolean().required()
        });
    
        return schema.validate(room);
    };

    module.exports = {
        Room,
        validateRoom
    }

 