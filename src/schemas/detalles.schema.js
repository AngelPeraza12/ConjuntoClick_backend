const detalleSchema = {
    type: 'object',
    required: ['id_pedido', 'id_producto', 'cantidad', 'precio_unitario'],
    properties: {
        id_pedido: { type: 'integer' },
        id_producto: { type: 'integer' },
        cantidad: { type: 'integer', example: 2 },
        precio_unitario: { type: 'number', example: 25.00 }        
    }
};

module.exports = { detalleSchema };