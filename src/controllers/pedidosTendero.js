// src/controllers/pedidosTendero.js
const db = require('../db');

const pedidosTenderoController = {
    // Obtener todos los pedidos con los datos del residente (INNER JOIN)
    getHistorialPedidos: async (req, res) => {
        try {
            const [rows] = await db.query(`
                SELECT 
                    p.id_pedido,
                    p.fecha_pedido,
                    p.total,
                    p.estado,
                    u.nombre AS nombre_usuario,
                    u.torre,
                    u.apartamento,
                    u.email
                FROM pedidos p
                INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
                ORDER BY p.fecha_pedido DESC
            `);
            
            res.status(200).json(rows);
        } catch (error) {
            console.error("Error en pedidosTendero (getHistorial):", error.message);
            res.status(500).json({ error: error.message });
        }
    },

    // Cambiar el estado de la compra (Pendiente -> Despachado / Cancelado)
    updateEstadoPedido: async (req, res) => {
        const { id } = req.params;
        const { estado } = req.body;

        try {
            await db.query(
                'UPDATE pedidos SET estado = ? WHERE id_pedido = ?',
                [estado, id]
            );

            res.status(200).json({ 
                mensaje: `El pedido #${id} fue actualizado con éxito a: ${estado}` 
            });
        } catch (error) {
            console.error("Error en pedidosTendero (updateEstado):", error.message);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = pedidosTenderoController;