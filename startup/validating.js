'use strict';

const Joi = require('joi');

module.exports = () =>{
    Joi.objecteId = require('joi-objectid')(Joi);
}