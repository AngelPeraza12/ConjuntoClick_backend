const db = require('../db');

const obtenerPedidos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM pedidos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error de conexión con pedidos", 
            error_real: error.message 
    });
}};

module.exports = {
    obtenerPedidos
};