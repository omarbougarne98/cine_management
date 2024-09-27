const { Ticket, validateTicket } = require('../models/ticketModel');
const { Session } = require('../models/sessionModel');
const { User } = require('../models/userModel');


const createTicket = async (req, res) => {
    
    const { error } = validateTicket(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    
    const user = await User.findById(req.body.user);
    if (!user) return res.status(404).send('User not found.');

    
    const session = await Session.findById(req.body.session);
    if (!session) return res.status(404).send('Session not found.');

    
    const ticket = new Ticket({
        user: user._id,
        session: session._id,
        purchaseDate: req.body.purchaseDate 
    });

    try {
        
        await ticket.save();
        res.status(201).send(ticket);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};


const getAllTickets = async (req, res) => {
    try {
        
        const tickets = await Ticket.find().populate('user').populate('session');
        res.send(tickets);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};


const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('user').populate('session');
        if (!ticket) return res.status(404).send('Ticket not found');
        res.send(ticket);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};


const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndRemove(req.params.id);
        if (!ticket) return res.status(404).send('Ticket not found');
        res.send(ticket);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    deleteTicket
};
