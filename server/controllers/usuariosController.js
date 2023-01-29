const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Obtener datos de un usuario
exports.obtenerUsuarioById = async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);
        if(!usuario) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        usuario = await Usuario.findById({_id : req.params.id });
        res.json({ usuario });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error. Intentelo de nuevo mas tarde.');
    }
}

// Crear usuario
exports.crearUsuario  = async (req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if(usuario) {
            return res.status(400).json({ msg: 'El registro ya existe.' });
        }
        usuario = new Usuario(req.body);
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt );
        await usuario.save();

        const payload = {usuario: {id: usuario.id}};
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 7200 // 2 horas
        }, (error, token) => {
            if(error) throw error;
            res.json({ token  });
        });
        res.status(200).send('Registro creado correctamente.');
    } catch (error) {
        res.status(500).send('Ha ocurrido un error. Intentelo de nuevo mas tarde.');
    }
}

// Modificar usuario
exports.actualizarUsuario = async(req, res) => {
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {
        let usuario = await Usuario.findById(req.params.id);
        if(!usuario) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }

        const { password } = req.body;
        const nuevoUsuario = {};
        const salt = await bcryptjs.genSalt(10);
        nuevoUsuario.password = await bcryptjs.hash(password, salt );;
        usuario = await Usuario.findOneAndUpdate({_id : req.params.id }, nuevoUsuario, { new: true } );
        res.json({ usuario, msg: 'Registro modificado correctamente' });
    } catch (error) {
        res.status(500).send('Ha ocurrido un error. Intentelo de nuevo mas tarde.');
    }
}

// Eliminar usuario
exports.eliminarUsuario = async(req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);
        if(!usuario) {
            return res.status(404).json({msg: 'No existe el registro.'});
        }
        await Usuario.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Registro eliminado'})
    } catch (error) {
        res.status(500).send('Ha ocurrido un error. Intentelo de nuevo mas tarde.');
    }
}
