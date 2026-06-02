// src/routes/pedidosTendero.js
const express = require('express');
const router = express.Router();
const pedidosTenderoController = require('../controllers/pedidosTendero');

// Definimos los endpoints administrativos
router.get('/', pedidosTenderoController.getHistorialPedidos);
router.put('/:id/estado', pedidosTenderoController.updateEstadoPedido);

module.exports = router;