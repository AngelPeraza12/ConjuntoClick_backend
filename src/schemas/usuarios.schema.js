const usuarioSchema = {
    type: 'object',
    required: ['nombre', 'email', 'password', 'torre', 'apartamento'],
    properties: {
        nombre: { type: 'string', example: 'Juan Perez' },
        email: { type: 'string', format: 'email', example: 'juan@correo.com' },
        password: { type: 'string', description: 'Contraseña encriptada', example: '1234A'},
        rol: { type: 'string', enum: ['residente', 'tendero'], default: 'residente' },
        torre: { type: 'integer', example: 14 },
        apartamento: { type: 'integer', example: 556 }    
    }
};

module.exports = { usuarioSchema };