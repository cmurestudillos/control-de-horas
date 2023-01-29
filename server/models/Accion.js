const mongoose = require('mongoose');

const accionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('Accion', accionSchema);
