const { Session, validateSession } = require('../models/sessionModel');
const { Movie } = require('../models/movieModel');
const { Room } = require('../models/roomModel');

const addSession = async (req, res) => {


    const { error } = validateSession(req.body);
    if(error) return res.status(422).send("error validate");

    const movie = await Movie.findById(req.body.Movie);
    if(!movie) return res.status(422).send(movie);

    const room = await Room.findById(req.body.Room);
    if(!room) return res.status(422).send("error room");

    const session = new Session({
        movie: movie._id,
        room: room._id,
        movieTime: req.body.movieTime,
        availableSeats: req.body.availableSeats

    });
    try{
    await session.save();
    return res.status(201).send(session);

    }catch (err) {
        
        return res.status(500).send('Internal server error');
    }
}
module.exports = {
    addSession
}