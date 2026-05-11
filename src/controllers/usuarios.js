const db = require('../db');

const usuariosController = {
    // 1. Obtener todos los usuarios
    getAll: async (req, res) => {
        try {
            // No seleccionamos la contraseña por seguridad
            const [rows] = await db.query('SELECT id, nombre, email, rol, fecha_registro FROM usuarios');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 2. Obtener un solo usuario por ID
    getOne: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT id, nombre, email, rol, fecha_registro FROM usuarios WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 3. Crear un nuevo usuario (Registro)
    create: async (req, res) => {
        const { nombre, email, password, rol } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
                [nombre, email, password, rol || 'cliente']
            );
            res.status(201).json({ id: result.insertId, mensaje: "Usuario creado con éxito" });
        } catch (error) {
            // Manejo de error por email duplicado
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ mensaje: "El correo electrónico ya está registrado" });
            }
            res.status(500).json({ error: error.message });
        }
    },

    // 4. Actualizar datos de usuario
    update: async (req, res) => {
        const { nombre, email, rol } = req.body;
        try {
            const [result] = await db.query(
                'UPDATE usuarios SET nombre=?, email=?, rol=? WHERE id=?',
                [nombre, email, rol, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
            res.json({ mensaje: "Usuario actualizado con éxito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 5. Eliminar un usuario
    delete: async (req, res) => {
        try {
            const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
            res.json({ mensaje: "Usuario eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = usuariosController;