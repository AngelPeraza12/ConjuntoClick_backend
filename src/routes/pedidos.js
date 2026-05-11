const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos');

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Listar todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 *
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido realizado
 *
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obtener detalle de un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del pedido
 *
 *   put:
 *     summary: Cambiar estado del pedido (ej. pagado o enviado)
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       200:
 *         description: Pedido actualizado
 *
 *   delete:
 *     summary: Cancelar/Eliminar pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido cancelado
 */

router.get('/', pedidosController.getAll);
router.post('/', pedidosController.create);
router.get('/:id', pedidosController.getOne);
router.put('/:id', pedidosController.update);
router.delete('/:id', pedidosController.delete);

module.exports = router;