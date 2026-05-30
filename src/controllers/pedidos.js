const db = require('../db');

const pedidosController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM pedidos');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ mensaje: "Pedido no encontrado" });
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { id_usuario, total, estado } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO pedidos (id_usuario, total, estado) VALUES (?, ?, ?)',
                [id_usuario, total, estado || 'pendiente']
            );
            res.status(201).json({ id: result.insertId, mensaje: "Pedido registrado con éxito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { estado, total } = req.body;
        try {
            const [result] = await db.query(
                'UPDATE pedidos SET estado = ?, total = ? WHERE id_pedido = ?',
                [estado, total, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Pedido no encontrado" });
            res.json({ mensaje: "Pedido actualizado con éxito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const [result] = await db.query('DELETE FROM pedidos WHERE id_pedido = ?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Pedido no encontrado" });
            res.json({ mensaje: "Pedido eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = pedidosController;