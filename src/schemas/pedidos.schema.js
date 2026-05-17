const pedidoSchema = {
    type: 'object',
    required: ['usuario_id', 'total'], // 'fecha' NO va aquí para que sea opcional al crear
    properties: {        
        usuario_id: { type: 'integer', description: 'ID del usuario que compra' },
        fecha: { 
            type: 'string', 
            format: 'date-time', 
            description: 'Fecha de registro del pedido',
            default: 'CURRENT_TIMESTAMP' // Indica en tu documentación que el backend asignará la fecha actual
        },
        estado: { type: 'string', enum: ['pendiente', 'pagado', 'enviado', 'cancelado'], default: 'pendiente' },
        total: { type: 'number', example: 150.50 }
    }
};

module.exports = { pedidoSchema };