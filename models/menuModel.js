const db = require('../db');

module.exports = {
  getAllByUsuario: async (usuarioId) => {
    const [rows] = await db.query('SELECT * FROM menu WHERE usuario_id = ?', [usuarioId]);
    return rows;
  },

  create: async (dados) => {
    const { nome_prato, preco, descricao, imagem, usuario_id, destaque } = dados;
    const query = 'INSERT INTO menu (nome_prato, preco, descricao, imagem, usuario_id, destaque) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(query, [nome_prato, preco, descricao, imagem, usuario_id, destaque]);
  },

  update: async (id, dados) => {
    const { nome_prato, preco, descricao, imagem, destaque } = dados;
    const query = 'UPDATE menu SET nome_prato = ?, preco = ?, descricao = ?, imagem = ?, destaque = ? WHERE id = ?';
    await db.query(query, [nome_prato, preco, descricao, imagem, destaque, id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM menu WHERE id = ?', [id]);
  }
};
