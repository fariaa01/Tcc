const db = require('../db');


async function getItemById(id) {
  try {
    const [rows] = await db.query(
      'SELECT * FROM pratos WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  listarPorUsuario: async (usuarioId) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM pratos WHERE usuario_id = ? ORDER BY criado_em DESC',
        [usuarioId]
      );
      return rows;
    } catch (err) {
      throw err;
    }
  },
  getItemById
};
