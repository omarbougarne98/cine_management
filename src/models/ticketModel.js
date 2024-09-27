const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    
    })
  

const Ticket = mongoose.model('Ticket', ticketSchema);
const validateTicket = (ticket) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        session: Joi.string().required(),
        purchaseDate: Joi.date().required()
    })

    return schema.validate(ticket);
}

module.exports = {
    Ticket,
    validateTicket
}