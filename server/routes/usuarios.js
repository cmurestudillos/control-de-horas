const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Obtener usuario
router.get('/:id', usuariosController.obtenerUsuarioById);
// Crear usuario
router.post('/', usuariosController.crearUsuario);
// Actualizar usuario
router.put('/:id', usuariosController.actualizarUsuario);
// Eliminar usuario
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;