const mysql = require('mysql2');
require('dotenv').config({ path: './.env' }); // Fuerza la ruta si es necesario

//pool de conexiones (más eficiente que una sola conexión dejo un limite de 10
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();