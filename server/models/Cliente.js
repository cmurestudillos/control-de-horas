const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto',
        require: true
    } 
});

module.exports = mongoose.model('Cliente', clienteSchema);
