const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});

// Importar Rutas
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios')

app.get('/', (req, res) => {
    res.send('¡El servidor de ConjuntoClick está vivo! 🚀');
});
// Usar Rutas (todas empezarán con /api por buena practica de bd)

app.use('/api/productos', productosRoutes);

app.use('/api/usuarios', usuariosRoutes);



