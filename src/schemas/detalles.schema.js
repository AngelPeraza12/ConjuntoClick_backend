const detalleSchema = {
    type: 'object',
    required: ['pedido_id', 'producto_id', 'cantidad', 'precio_unitario'],
    properties: {
        id: { type: 'integer' },
        pedido_id: { type: 'integer' },
        producto_id: { type: 'integer' },
        cantidad: { type: 'integer', example: 2 },
        precio_unitario: { type: 'number', example: 25.00 }        
    }
};

module.exports = { detalleSchema };