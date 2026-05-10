const db = require('../db');

const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ 
            mensaje: "Error de conexión con usuarios", 
            error_real: error.message 
    });
}};

module.exports = {
    obtenerUsuarios
};