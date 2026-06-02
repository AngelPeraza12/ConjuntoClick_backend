const db = require('../db');

const notificacionesController = {
    // 🟢 CREATE - Crear notificación manual
    create: async (req, res) => {
        const { id_usuario, id_pedido, mensaje } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO notificaciones (id_usuario, id_pedido, mensaje, leido) VALUES (?, ?, ?, 0)',
                [id_usuario, id_pedido, mensaje]
            );
            res.status(201).json({ id: result.insertId, mensaje: "Notificación registrada con éxito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🔵 READ - Obtener todas las notificaciones generales
    getAll: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM notificaciones ORDER BY fecha_creacion DESC');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🔵 READ - Obtener las notificaciones específicas de un Residente
    getByUsuario: async (req, res) => {
        const { id_usuario } = req.params;
        try {
            const [rows] = await db.query(
                'SELECT * FROM notificaciones WHERE id_usuario = ? ORDER BY fecha_creacion DESC',
                [id_usuario]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🟡 UPDATE - Marcar una notificación como leída (Cambiar leido de 0 a 1)
    marcarLeida: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await db.query('UPDATE notificaciones SET leido = 1 WHERE id_notificacion = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Notificación no encontrada" });
            res.json({ mensaje: "Notificación marcada como leída" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🔴 DELETE - Eliminar una notificación en específico
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await db.query('DELETE FROM notificaciones WHERE id_notificacion = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Notificación no encontrada" });
            res.json({ mensaje: "Notificación eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🔴 DELETE ALL - Vaciar por completo la bandeja de entrada del usuario
    deleteAllByUsuario: async (req, res) => {
        const { id_usuario } = req.params;
        try {
            await db.query('DELETE FROM notificaciones WHERE id_usuario = ?', [id_usuario]);
            res.json({ mensaje: "Bandeja de entrada vaciada por completo" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = notificacionesController;