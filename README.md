⚙️ ConjuntoClick - Backend API
Este repositorio contiene la API REST centralizada para ConjuntoClick. Es el motor encargado de procesar la lógica de negocio, gestionar la autenticación de los 384 apartamentos y garantizar la integridad de los pedidos en las 16 torres mediante una base de datos relacional.

🛠️ Stack Tecnológico
Entorno: Node.js (Runtime de JavaScript en el servidor).

Framework: Express.js para el manejo de rutas y middlewares.

Base de Datos: SQL (MySQL/PostgreSQL) para la persistencia de datos relacionales.

ORM: Sequelize o [Prisma] para el mapeo objeto-relacional.

Seguridad: [JSON Web Token (JWT)] para sesiones seguras y [Bcrypt.js] para el hashing de contraseñas de los residentes.

🏗️ Arquitectura de la Base de Datos (SQL)
El modelo de datos está diseñado para escalar y mantener la integridad referencial:

Usuarios: Gestión de roles (Residente/Tendero) y ubicación física (Torre/Apto).

Productos: Catálogo con control de stock en tiempo real.

Pedidos: Cabecera de la transacción con estados dinámicos (Pendiente, En camino, Entregado).

DetallePedido: Relación técnica que vincula productos y cantidades a una orden específica.

🚦 Endpoints Principales (API)
Método	Ruta	Descripción
POST	/api/auth/register	Registro de nuevos residentes (validación de torre/apto).
POST	/api/auth/login	Autenticación y generación de Token JWT.
GET	/api/products	Obtener catálogo completo de la tienda.
POST	/api/orders	Creación de un nuevo pedido (requiere Token).
PATCH	/api/orders/:id	Actualización de estado del pedido (Solo Tendero).
