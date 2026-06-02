const { productoSchema } = require('./productos.schema');
const { usuarioSchema } = require('./usuarios.schema');
const { pedidoSchema } = require('./pedidos.schema');
const { detalleSchema } = require('./detalles.schema');
const { notificacionesSchema} = require('./notificaciones.schema')

module.exports = {
    Producto: productoSchema,
    Usuario: usuarioSchema,
    Pedido: pedidoSchema,
    Detalle: detalleSchema,
    notificaciones: notificacionesSchema,
};