const express = require('express');
const router = express.Router();
const detallesController = require('../controllers/detalles');

/**
 * @swagger
 * /api/detalles:
 *   get:
 *     summary: Ver todos los detalles registrados
 *     tags: [Detalles]
 *     responses:
 *       200:
 *         description: Lista de detalles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Detalle'
 *
 *   post:
 *     summary: Registrar un nuevo detalle (producto en pedido)
 *     tags: [Detalles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Detalle'
 *     responses:
 *       201:
 *         description: Detalle registrado
 *
 * /api/detalles/{id}:
 *   get:
 *     summary: Obtener un detalle específico por ID
 *     tags: [Detalles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *
 *   put:
 *     summary: Editar cantidad o precio en el detalle
 *     tags: [Detalles]
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
 *             $ref: '#/components/schemas/Detalle'
 *     responses:
 *       200:
 *         description: Detalle actualizado
 *
 *   delete:
 *     summary: Quitar producto del detalle
 *     tags: [Detalles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle eliminado
 */

router.get('/', detallesController.getAll);
router.post('/', detallesController.create);
router.get('/:id', detallesController.getOne);
router.put('/:id', detallesController.update);
router.delete('/:id', detallesController.delete);

module.exports = router;