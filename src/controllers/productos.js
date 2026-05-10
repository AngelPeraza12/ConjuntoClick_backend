const db = require('../db');

const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error de conexión con productos", 
            error_real: error.message 
    });
}};

module.exports = {
    obtenerProductos
};