const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now()
    },  
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    cliente: {
        type: mongoose.Schema.Types.Object,
        ref: 'Cliente',
        require: true
    }, 
    proyecto: {
        type: mongoose.Schema.Types.Object,
        ref: 'Proyecto',
        require: true
    },      
    accion: {
        type: mongoose.Schema.Types.Object,
        ref: 'Accion',
        require: true
    },   
    tiempo: {
        type: Number,
        required: true
    },      
});

module.exports = mongoose.model('Tarea', TareaSchema);