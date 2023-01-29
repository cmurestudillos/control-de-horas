const Tarea = require('../models/Tarea');
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find().sort({ fecha: -1 });
        res.json({ tareas });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Obtener detalle de tarea
exports.obtenerTareaById = async (req, res) => {
    try {
        const existeUsuario = await Usuario.findById(req.params.id);
        if(!existeUsuario) {
            return res.status(404).json({msg: 'Usuario no encontrado.'})
        }
        if(existeUsuario._id.toString() !== req.params.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        const tarea = await Tarea.find({usuario: existeUsuario._id}).sort({ fecha: -1 });
        res.json({ tarea });
    } catch (error) {
        console.log(error)
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Crear tarea
exports.crearTarea = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    
    try {
        const existeUsuario = await Usuario.findById(req.params.id);
        if(!existeUsuario) {
            return res.status(404).json({msg: 'Usuario no encontrado.'})
        }
        if(existeUsuario._id.toString() !== req.params.id ) {
            return res.status(401).json({msg: 'No Autorizado.'});
        }
        const { fecha, usuario, cliente, proyecto, accion } = req.body;
        let existeTarea = await Tarea.findOne({ fecha, usuario, cliente, proyecto, accion });
        if(existeTarea) {
            return res.status(409).json({ msg: 'La tarea existe. No se puede repetir.' });
        }
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea, msg: 'Registro creado correctamente.' });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Actualizar Tarea
exports.actualizarTarea = async (req, res ) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea.'});
        }

        const { cliente, proyecto, accion, tiempo } = req.body;
        const nuevaTarea = {};
        nuevaTarea.cliente = cliente;
        nuevaTarea.proyecto = proyecto;
        nuevaTarea.accion = accion;
        nuevaTarea.tiempo = tiempo;
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id }, nuevaTarea, { new: true } );
        res.json({ tarea, msg:"Registro actualizado correctamente." });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
    try {
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea.'});
        }
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'TaRegistro eliminado correctamente.'})
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}