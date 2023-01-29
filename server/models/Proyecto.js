const mongoose = require('mongoose');

const proyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);
