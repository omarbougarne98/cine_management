const {Room , validateRoom} = require('../models/roomModel');


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
    if(error) return res.status(422).send(error.details[0].message);

    const room = new Room({
        name: req.body.name,
        numberOfSeats: req.body.numberOfSeats,
        availability: req.body.availability
    })
    await room.save();
    res.send(room);
}

const updateRoom = async (req, res) => {
    const { error } = validateRoom(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const room = await Room.findOneAndUpdate(req.params.id, {
        name: req.body.name,
        numberOfSeats: req.body.numberOfSeats,
        availability: req.body.availability
        },
        {new: true}

    );
    if(!room) return res.status(422).send(error.details[0].message)
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
