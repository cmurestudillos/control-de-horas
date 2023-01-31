// Validaciones
const { validationResult } = require('express-validator');
// Modelo de Datos
const Accion = require('../models/Accion');

//Obtener Acciones
exports.obtenerAcciones = async (req, res) => {
    try {
        const acciones = await Accion.find().sort({ nombre: 0 });
        res.json({ acciones });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Obtener datos de una accion
exports.obtenerAccionById = async (req, res) => {
    try {
        let accion = await Accion.findById(req.params.id);
        if(!accion) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        accion = await Accion.findById({_id : req.params.id });
        res.json({ accion });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar obtener datos del registro. Intentelo de nuevo.');
    }
}

// Crear accion
exports.crearAccion = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        const { nombre } = req.body;
        let accion = await Accion.findOne({ nombre });
        if(accion) {
            return res.status(400).json({ msg: 'El registro ya existe.' });
        }
        accion = new Accion(req.body);
        await accion.save();
        res.status(200).json({msg: 'Registro creado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar crear el registro. Intentelo de nuevo.');
    }
}

// Modificar accion
exports.actualizarAccion = async(req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        const { nombre } = req.body;
        let accion = await Accion.findById(req.params.id);
        if(!accion) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        const nuevaAccion = {};
        nuevaAccion.nombre = nombre;
        accion = await Accion.findOneAndUpdate({_id : req.params.id }, nuevaAccion, { new: true } );
        res.status(200).json({msg: 'Registro actualizado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar modificar el registro. Intentelo de nuevo.');
    }
}

// Eliminar accion
exports.eliminarAccion = async(req, res) => {
    try {
        let accion = await Accion.findById(req.params.id);
        if(!accion) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        await Accion.findOneAndRemove({_id: req.params.id});
        res.status(200).json({msg: 'Registro eliminado.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al eliminar el registro. Intentelo de nuevo.');
    }
}