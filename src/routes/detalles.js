const express = require('express');
const router = express.Router();
const detallesController = require('../controllers/detalles');

// Definimos la ruta GET para el inicio (/)
router.get('/', detallesController.obtenerDetalles);

module.exports = router;