const db = require('../db');

const obtenerDetalles = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM detalle_pedidos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error de conexión con detalles", 
            error_real: error.message 
    });
}};

module.exports = {
    obtenerDetalles
};