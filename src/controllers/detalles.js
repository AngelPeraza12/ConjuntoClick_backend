const db = require('../db');

const detallesController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM detalle_pedidos');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM detalle_pedidos WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ mensaje: "Detalle no encontrado" });
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
                [pedido_id, producto_id, cantidad, precio_unitario]
            );
            res.status(201).json({ id: result.insertId, mensaje: "Producto agregado al detalle del pedido" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { cantidad, precio_unitario } = req.body;
        try {
            const subtotal = cantidad * precio_unitario;
            const [result] = await db.query(
                'UPDATE detalle_pedidos SET cantidad = ?, precio_unitario = ?, subtotal = ? WHERE id = ?',
                [cantidad, precio_unitario, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Detalle no encontrado" });
            res.json({ mensaje: "Detalle actualizado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const [result] = await db.query('DELETE FROM detalle_pedidos WHERE id = ?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Detalle no encontrado" });
            res.json({ mensaje: "Producto quitado del detalle" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = detallesController;