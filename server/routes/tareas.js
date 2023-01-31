const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

//Obtener todas las tareas
router.get('/usuario/:usuario',tareasController.obtenerTareas);
//Obtener detalle de la tarea
router.get('/:id',tareasController.obtenerTareaById);
// Crear Tarea
router.post('/',tareasController.crearTarea);
// Actualizar Tarea
router.put('/:id', tareasController.actualizarTarea);
// Eliminar Tarea
router.delete('/:id', tareasController.eliminarTarea);

module.exports = router;