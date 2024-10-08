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
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
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
            availability: Joi.boolean().required(),
            movie: Joi.string().required()
        });
        return schema.validate(room);
    };
    const validateUpdate = (room) => {
        const schema = Joi.object({
            name: Joi.string().valid().optional(),
            numberOfSeats: Joi.number().integer().min(1).max(100).optional(),
            availability: Joi.boolean().optional(),
        });
        return schema.validate(room);
    }
        


    module.exports = {
        Room,
        validateRoom,
        validateUpdate
    }

 