const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios');

// Definimos la ruta GET para el inicio (/)
router.get('/', usuariosController.obtenerUsuarios);

module.exports = router;