const express = require('express');
const router = express.Router();
const accionesController = require('../controllers/accionesController');

// Obtener acciones
router.get('/', accionesController.obtenerAcciones);
// Obtener datos de una accion
router.get('/:id', accionesController.obtenerAccionById);
// Crear accion
router.post('/', accionesController.crearAccion);
// Actualizar accion
router.put('/:id', accionesController.actualizarAccion);
// Eliminar accion
router.delete('/:id', accionesController.eliminarAccion);

module.exports = router;