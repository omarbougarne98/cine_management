const {Ticket, validateTicket} = require('../models/ticketModel');
const { User } = require('../models/userModel');
const { Session } = require('../models/sessionModel');

const addTicket = async (req, res) => {
    const { error } = validateTicket(req, res);
    if(error) return res.status(422).send(error);

    const user = await User.findById(req.body.user);
    if(!user) return res.status(422).send(error);

    const session = await Session.findById(req.body.session)
    if(!session) return res.status(422).send(error);
    const ticket = new Ticket({
        user: user._id,
        session: session._id,
        purchaseDate: req.body.purchaseDate
    })

    await session.save();
}

module.exports = {
    addTicket,
    validateTicket
}