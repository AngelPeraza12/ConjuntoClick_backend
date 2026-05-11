const usuarioSchema = {
    type: 'object',
    required: ['nombre', 'email', 'password'],
    properties: {
        id: { type: 'integer', description: 'ID autogenerado' },
        nombre: { type: 'string', example: 'Juan Perez' },
        email: { type: 'string', format: 'email', example: 'juan@correo.com' },
        password: { type: 'string', description: 'Contraseña encriptada' },
        rol: { type: 'string', enum: ['cliente', 'admin'], default: 'cliente' },
        fecha_registro: { type: 'string', format: 'date-time' }
    }
};

module.exports = { usuarioSchema };