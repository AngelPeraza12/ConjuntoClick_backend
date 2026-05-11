const productoSchema = {
    type: 'object',
    required: ['nombre', 'precio'],
    properties: {
        id: { type: 'integer', description: 'ID autogenerado' },
        nombre: { type: 'string' },
        descripcion: { type: 'string' },
        precio: { type: 'number' },
        stock: { type: 'integer' },
        imagen_url: { type: 'string' },
        categoria: { type: 'string' }
    }
};

module.exports = { productoSchema };