const Tarea = require('../models/Tarea');
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find({usuario: req.params.usuario}).sort({ fecha: -1 });
        res.json({ tareas });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Obtener detalle de tarea
exports.obtenerTareaById = async (req, res) => {
    try {
        let existeTarea = await Tarea.findById(req.params.id);
        if(!existeTarea) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        const tarea = await Tarea.find({_id: req.params.id});
        res.json({ tarea });
    } catch (error) {
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
        const { fecha, usuario, cliente, proyecto, accion, tiempo } = req.body;
        let tarea = await Tarea.findOne({ fecha, usuario, cliente, proyecto, accion, tiempo });
        if(tarea) {
            return res.status(400).json({ msg: 'El registro ya existe.' });
        }
        tarea = new Tarea(req.body);
        await tarea.save();
        res.status(200).json({msg: 'Registro creado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar generar el registro. Intentelo de nuevo.');
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
        res.status(200).json({msg: 'Registro actualizado correctamente.'})
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar actualizar el registro. Intentelo de nuevo.');
    }
}

// Eliminar Tarea
exports.eliminarTarea = async (req, res) => {
    try {
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea.'});
        }
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Registro eliminado correctamente.'})
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar eliminar el registro. Intentelo de nuevo.');
    }
}