const pedidoSchema = {
    type: 'object',
    required: ['usuario_id', 'total'],
    properties: {
        id: { type: 'integer' },
        usuario_id: { type: 'integer', description: 'ID del usuario que compra' },
        fecha: { type: 'string', format: 'date-time' },
        estado: { type: 'string', enum: ['pendiente', 'pagado', 'enviado', 'cancelado'], default: 'pendiente' },
        total: { type: 'number', example: 150.50 }
    }
};

module.exports = { pedidoSchema };