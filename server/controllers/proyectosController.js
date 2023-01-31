// Validaciones
const { validationResult } = require('express-validator');
// Modelo de Datos
const Proyecto = require('../models/Proyecto');

//Obtener Proyectos
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find().sort({ _id : 0 });
        res.json({ proyectos });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Obtener datos de un proyecto
exports.obtenerProyectoById = async (req, res) => {
    try {
        let proyecto = await Proyecto.findById(req.params.id);
        if(!proyecto) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        proyecto = await Proyecto.findById({_id : req.params.id });
        res.json({ proyecto });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar obtener datos del registro. Intentelo de nuevo.');
    }
}

// Crear proyecto
exports.crearProyecto = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        const { nombre } = req.body;
        let proyecto = await Proyecto.findOne({ nombre });
        if(proyecto) {
            return res.status(400).json({ msg: 'El registro ya existe.' });
        }
        proyecto = new Proyecto(req.body);
        await proyecto.save();
        res.status(200).json({msg: 'Registro creado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar crear el registro. Intentelo de nuevo.');
    }
}

// Modificar Proyecto
exports.actualizarProyecto = async(req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        const { nombre } = req.body;
        let proyecto = await Proyecto.findById(req.params.id);
        if(!proyecto) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        const nuevoProyecto = {};
        nuevoProyecto.nombre = nombre;
        proyecto = await Proyecto.findOneAndUpdate({_id : req.params.id }, nuevoProyecto, { new: true } );
        res.status(200).json({msg: 'Registro actualizado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar modificar el registro. Intentelo de nuevo.');
    }
}

// Eliminar Proyecto
exports.eliminarProyecto = async(req, res) => {
    try {
        let proyecto = await Proyecto.findById(req.params.id);
        if(!proyecto) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        await Proyecto.findOneAndRemove({_id: req.params.id});
        res.status(200).json({msg: 'Registro eliminado.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al eliminar el registro. Intentelo de nuevo.');
    }
}