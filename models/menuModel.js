const db = require('../db');

module.exports = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM pedidos');
    return rows;
  },

  create: async (dados) => {
    const {
      nome_cliente, pedido, ingredientes, foto, quantidade,
      preco, status_pedido = 'pendente', observacoes, usuario_id
    } = dados;

    await db.query(
      `INSERT INTO pedidos (
        nome_cliente, pedido, ingredientes, foto,
        quantidade, preco, status_pedido, observacoes,
        data_pedido, usuario_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
      [
        nome_cliente, pedido, ingredientes, foto,
        quantidade, preco, status_pedido, observacoes, usuario_id
      ]
    );
  },

  update: async (id, dados) => {
    const {
      nome_cliente, pedido, ingredientes, quantidade,
      preco, status_pedido, observacoes
    } = dados;

    await db.query(
      `UPDATE pedidos SET
        nome_cliente = ?, pedido = ?, ingredientes = ?, quantidade = ?,
        preco = ?, status_pedido = ?, observacoes = ?
      WHERE id = ?`,
      [
        nome_cliente, pedido, ingredientes, quantidade,
        preco, status_pedido, observacoes, id
      ]
    );
  },

  delete: async (id) => {
    await db.query('DELETE FROM pedidos WHERE id = ?', [id]);
  }
};
