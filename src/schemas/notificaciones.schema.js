const notificacionSchema = {
    type: 'object',
    required: ['id_usuario', 'id_pedido', 'mensaje'],
    properties: {
        id_usuario: { type: 'integer' },
        id_pedido: { type: 'integer' },
        mensaje: { type: 'string', example: '¡Tu pedido #3 ha sido despachado con éxito! 📦' },
        leido: { type: 'boolean', default: false, example: false }
    }
};

module.exports = { notificacionSchema };