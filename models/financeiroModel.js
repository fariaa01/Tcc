const db = require('../db');

module.exports = {
  getAll: async (usuarioId) => {
    const [rows] = await db.query('SELECT * FROM financeiro WHERE usuario_id = ?', [usuarioId]);
    return rows;
  },

  create: async (dados, usuarioId) => {
    const { tipo, categoria, valor, data } = dados;
    await db.query(
      'INSERT INTO financeiro (tipo, categoria, valor, data, usuario_id) VALUES (?, ?, ?, ?, ?)',
      [tipo, categoria, valor, data, usuarioId]
    );
  },

  update: async (id, dados, usuarioId) => {
    const { tipo, categoria, valor, data } = dados;
    await db.query(
      'UPDATE financeiro SET tipo=?, categoria=?, valor=?, data=? WHERE id=? AND usuario_id=?',
      [tipo, categoria, valor, data, id, usuarioId]
    );
  },

  delete: async (id, usuarioId) => {
    await db.query('DELETE FROM financeiro WHERE id = ? AND usuario_id = ?', [id, usuarioId]);
  }
};
