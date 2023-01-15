const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es un campo obligatorio']
    },
});

module.exports = model( 'Rol', RolSchema );

