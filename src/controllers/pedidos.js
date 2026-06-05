const db = require('../db');

const pedidosController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM pedidos');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ mensaje: "Pedido no encontrado" });
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { id_usuario, total, estado } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO pedidos (id_usuario, total, estado) VALUES (?, ?, ?)',
                [id_usuario, total, estado || 'pendiente']
            );
            res.status(201).json({ id: result.insertId, mensaje: "Pedido registrado con éxito" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { estado, total } = req.body;
        const { id } = req.params;

        try {
            // 🔥 CORRECCIÓN 1: Traemos obligatoriamente 'id_usuario' de la base de datos junto con el estado
            const [pedidoActual] = await db.query('SELECT estado, id_usuario FROM pedidos WHERE id_pedido = ?', [id]);
            
            if (pedidoActual.length === 0) {
                return res.status(404).json({ mensaje: "Pedido no encontrado" });
            }

            const estadoAnterior = pedidoActual[0].estado;
            const id_usuario = pedidoActual[0].id_usuario; // 🌟 Ahora esta variable ya tiene valor real

            // 2. Modificar el pedido
            await db.query(
                'UPDATE pedidos SET estado = ?, total = COALESCE(?, total) WHERE id_pedido = ?',
                [estado, total, id]
            );

            // 3. 📦 SI PASA A DESPACHADO -> GUARDAR NOTIFICACIÓN
            if (estado && estado.toLowerCase() === 'despachado') {
                const mensajeNotificacion = `¡Tu pedido #${id} ha sido despachado con éxito y va en camino! 📦`;
                await db.query(
                    'INSERT INTO notificaciones (id_usuario, id_pedido, mensaje, leido) VALUES (?, ?, ?, 0)',
                    [id_usuario, id, mensajeNotificacion]
                );
            }

            // 4. ❌ SI PASA A CANCELADO -> DEVOLVER STOCK Y GUARDAR NOTIFICACIÓN
            if (estado && estado.toLowerCase() === 'cancelado' && estadoAnterior !== 'Cancelado') {
                const [articulos] = await db.query(
                    'SELECT id_producto, cantidad FROM detalle_pedidos WHERE id_pedido = ?', 
                    [id]
                );

                for (const articulo of articulos) {
                    await db.query(
                        'UPDATE productos SET stock = stock + ? WHERE id_producto = ?',
                        [articulo.cantidad, articulo.id_producto]
                    );
                }

                const mensajeNotificacion = `Lo sentimos, tu pedido #${id} fue cancelado por el tendero. Los artículos han sido reincorporados al stock. ❌`;
                await db.query(
                    'INSERT INTO notificaciones (id_usuario, id_pedido, mensaje, leido) VALUES (?, ?, ?, 0)',
                    [id_usuario, id, mensajeNotificacion]
                );
            }

            res.json({ mensaje: "Pedido actualizado e histórico de notificaciones registrado con éxito" });
        } catch (error) {
            console.error("Error al actualizar pedido:", error);
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const [result] = await db.query('DELETE FROM pedidos WHERE id_pedido = ?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Pedido no encontrado" });
            res.json({ mensaje: "Pedido eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = pedidosController;