const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Obtener clientes
router.get('/', clientesController.obtenerClientes);
// Obtener detalle de cliente
router.get('/:id', clientesController.obtenerClienteById);
// Crear cliente
router.post('/', clientesController.crearCliente);
// Actualizar cliente
router.put('/:id', clientesController.actualizarCliente);
// Eliminar cliente
router.delete('/:id', clientesController.eliminarCliente);

module.exports = router;