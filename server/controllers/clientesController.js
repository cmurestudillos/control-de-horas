// Validaciones
const { validationResult } = require('express-validator');
// Modelo de datos
const Cliente = require('../models/Cliente');

//Obtener Clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find().sort({ _id : 0 });
        res.json({ clientes });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Obtener detalle de cliente
exports.obtenerClienteById = async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente) {
            return res.status(404).json({msg: 'No existe el cliente.'});
        }
        cliente = await Cliente.findById({_id : req.params.id });
        res.json({ cliente });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Crear cliente
exports.crearCliente = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    const { nombre, proyecto } = req.body;
    try {
        let cliente = await Cliente.findOne({ nombre });
        if(cliente) {
            return res.status(400).json({ msg: 'El cliente ya existe.' });
        }
        let nuevoCliente = new Cliente(req.body);
        nuevoCliente.nombre = nombre;
        nuevoCliente.proyecto = proyecto;
        await nuevoCliente.save();
        res.status(200).json({msg: 'Registro creado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Actualizar cliente
exports.actualizarCliente = async(req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente) {
            return res.status(404).json({msg: 'No existe el cliente.'});
        }
        const { nombre, proyecto } = req.body;
        const nuevoCliente = {};
        nuevoCliente.nombre = nombre;
        nuevoCliente.proyecto = proyecto;
        cliente = await Cliente.findOneAndUpdate({_id : req.params.id }, nuevoCliente, { new: true } );
        res.status(200).json({msg: 'Registro actualizado correctamente.'});
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}

// Eliminar cliente
exports.eliminarCliente = async(req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if(!cliente) {
            return res.status(404).json({msg: 'No existe el cliente.'});
        }
        await Cliente.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Registro eliminado correctamente.'})
    } catch (error) {
        res.status(500).send('Ha ocurrido un error al intentar cargar los datos. Intentelo de nuevo.');
    }
}