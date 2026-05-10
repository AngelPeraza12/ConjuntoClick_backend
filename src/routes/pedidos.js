const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos');

// Definimos la ruta GET para el inicio (/)
router.get('/', pedidosController.obtenerPedidos);

module.exports = router;