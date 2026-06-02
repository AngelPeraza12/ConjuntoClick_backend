const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/notificaciones');

// 📥 C - Crear
router.post('/', notificacionesController.create);

// 📋 R - Leer todas
router.get('/', notificacionesController.getAll);

// 🔔 R - Leer las de un usuario en específico
router.get('/usuario/:id_usuario', notificacionesController.getByUsuario);

// 🔄 U - Actualizar estado a leído
router.put('/:id/leido', notificacionesController.marcarLeida);

// ❌ D - Eliminar una
router.delete('/:id', notificacionesController.delete);

// 🗑️ D - Vaciar bandeja completa de un residente
router.delete('/usuario/vaciar/:id_usuario', notificacionesController.deleteAllByUsuario);

module.exports = router;