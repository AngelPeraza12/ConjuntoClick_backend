const productoSchema = {
    type: 'object',
    required: ['nombre', 'precio'],
    properties: {
        //id: { type: 'integer', description: 'ID autogenerado' },
        nombre: { type: 'string', example:'papa' },
        descripcion: { type: 'string' },
        precio: { type: 'number', example: 1000 },
        stock: { type: 'integer', example: 1 },
        imagen_url: { type: 'string' },
        categoria: { type: 'string', example: 'Frutas y verduras'}
    }
};

module.exports = { productoSchema };