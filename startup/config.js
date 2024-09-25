'use strict';

const config = require('config');
const { model } = require('mongoose');

module.exports = () =>{
    if(!config.get('jwtPrivateKey')){
        throw new Error('Fatal ERROR: jwtPrivateKey not defined');
    }
}


