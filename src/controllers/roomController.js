const {Room , validateRoom, validateUpdate} = require('../models/roomModel');
const {Movie} = require('../models/movieModel');


const getAllRoom = async (req, res) => {
    const room = await Room.find();
    res.send(room);
}

const getRoom = async (req, res) => {
    const room = await Room.findById(req.params.id);
    if(!room) return res.status(422).send('couldnt find room with this id');
    res.send(room);
}

const addRoom = async (req, res) => {
    
    const { error } = validateRoom(req.body);
    if (error) return res.status(422).send(error);
    
    
    console.log('Incoming movie ID:', req.body.movie);

    
    const movie = await Movie.findById(req.body.movie);
    if (!movie) return res.status(404).send('No Movie found with the provided ID');

    
    const room = new Room({
        name: req.body.name,
        numberOfSeats: req.body.numberOfSeats,
        availability: req.body.availability,
        movie: movie._id 
    });

    
    try {
        await room.save();
        return res.status(201).send(room); 
    } catch (err) {
        console.error('Error saving room:', err);
        return res.status(500).send('Internal server error');
    }
};



const updateRoom = async (req, res) => {
    const { error } = validateUpdate(req.body);
    if(error) return res.status(422).send("error in body");

    const updates = {};
    if(req.body.name !== undefined) updates.name =req.body.name;
    if(req.body.numberOfSeats !== undefined) updates.numberOfSeats = req.body.numberOfSeats; 
    if(req.body.availability !== undefined) updates.availability = req.body.availability
    const room = await Room.findOneAndUpdate(
        {_id: req.params.id},
        updates,
        {new: true}

    );
    if(!room) return res.status(422).send(error)
        res.send(room);
}

const deleteRoom = async (req, res) => {
    const room = Room.findByIdAndDelete(req.params.id);
    if(!room) return res.status(422).send(eroor.datails[0].message);
}

module.exports = {
    getAllRoom,
    getRoom,
    addRoom,
    updateRoom,
    deleteRoom
}
