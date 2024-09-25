'use strict'

const mongoose = require('mongoose');
const winston = require('winston')
module.exports = () =>{
    mongoose.connect('mongodb://localhost/CinemaDatabase')
    .then(() => winston.info('MongoDB Connected...'))
    .catch(err => winston.error('MongoDB connection error:', err));
    
}