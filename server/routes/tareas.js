const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

//Obtener todas las tareas
router.get('/',tareasController.obtenerTareas);
//Obtener detalle dela tarea
router.get('/:id',tareasController.obtenerTareaById);
// Crear Tarea
router.post('/:id',tareasController.crearTarea);
// Actualizar Tarea
router.put('/:id', tareasController.actualizarTarea);
// Eliminar Tarea
router.delete('/:id', tareasController.eliminarTarea);

module.exports = router;