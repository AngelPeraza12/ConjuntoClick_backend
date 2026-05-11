const db = require('../db');

const productosController = {
    // 1. Obtener todos los productos (READ)
    getAll: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM productos');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 2. Obtener un solo producto por ID (READ ONE)
    getOne: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 3. Crear un nuevo producto (CREATE)
    create: async (req, res) => {
        const { nombre, descripcion, precio, stock, imagen_url, categoria } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, categoria) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, descripcion, precio, stock, imagen_url, categoria]
            );
            res.status(201).json({ id: result.insertId, mensaje: "Producto creado con éxito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 4. Actualizar un producto (UPDATE)
    update: async (req, res) => {
        const { nombre, descripcion, precio, stock, imagen_url, categoria } = req.body;
        try {
            const [result] = await db.query(
                'UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, imagen_url=?, categoria=? WHERE id=?',
                [nombre, descripcion, precio, stock, imagen_url, categoria, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
            res.json({ mensaje: "Producto actualizado con éxito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 5. Eliminar un producto (DELETE)
    delete: async (req, res) => {
        try {
            const [result] = await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
            res.json({ mensaje: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = productosController;