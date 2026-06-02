const db = require('../db');

const detallesController = {
    // Devuelve todos los registros de los detalles (opcional)
    getAll: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM detalle_pedidos');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener los artículos específicos de un pedido concreto
    getOne: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM detalle_pedidos WHERE id_pedido = ?', [req.params.id]);
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
        try {
            // 1. Insertamos el artículo en la tabla correcta: detalle_pedidos
            const [result] = await db.query(
                'INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
                [id_pedido, id_producto, cantidad, precio_unitario]
            );

            // 2. Descontamos la cantidad comprada de la tabla productos
            await db.query(
                'UPDATE productos SET stock = stock - ? WHERE id_producto = ?',
                [cantidad, id_producto]
            );

            res.status(201).json({ id: result.insertId, mensaje: "Artículo registrado y stock actualizado" });
        } catch (error) {
            console.error("Error al guardar en detalle_pedidos:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar los detalles asociados si se requiere
    delete: async (req, res) => {
        try {
            const [result] = await db.query('DELETE FROM detalle_pedidos WHERE id_pedido = ?', [req.params.id]);
            res.json({ mensaje: "Detalles eliminados correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = detallesController;