const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargamos variables de entorno primero
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// 1. Importaciones de esquemas y rutas
const allSchemas = require('./schemas'); 
const productosRoutes = require('./routes/productos');
const usuariosRoutes = require('./routes/usuarios');
const pedidosRoutes = require('./routes/pedidos');
const detallesRoutes = require('./routes/detalles');

const app = express();

// 2. Configuración de Swagger (Debe estar ANTES de swaggerJsDoc)
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { 
            title: 'ConjuntoClick API', 
            version: '1.0.0',
            description: 'Documentación de la API de la tienda ConjuntoClick' 
        },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            schemas: allSchemas
        }
    },
    apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// 3. Middlewares Globales
app.use(cors());
app.use(express.json()); // Solo necesitas una vez esta línea

// 4. Rutas de Documentación
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// 5. Rutas de la API
app.get('/', (req, res) => {
    res.send('¡El servidor de ConjuntoClick está vivo! 🚀');
});

app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/detalles', detallesRoutes);

// 6. Encendido del Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`📖 Documentación en: http://localhost:${PORT}/api-docs`);
});