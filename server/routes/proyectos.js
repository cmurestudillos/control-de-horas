const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');

// Obtener proyectos
router.get('/', proyectosController.obtenerProyectos);
// Obtener datos de un proyecto
router.get('/:id', proyectosController.obtenerProyectoById);
// Crear proyecto
router.post('/', proyectosController.crearProyecto);
// Actualizar proyecto
router.put('/:id', proyectosController.actualizarProyecto);
// Eliminar proyecto
router.delete('/:id', proyectosController.eliminarProyecto);

module.exports = router;