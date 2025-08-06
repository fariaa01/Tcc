const db = require('../db');

module.exports = {
  getAll: async (usuarioId) => {
    const [rows] = await db.query('SELECT * FROM estoque WHERE usuario_id = ?', [usuarioId]);
    return rows;
  },

  getFiltrado: async ({ categoria, fornecedor, validade, usuarioId }) => {
    let query = 'SELECT * FROM estoque WHERE usuario_id = ?';
    const params = [usuarioId];

    if (categoria) {
      query += ' AND categoria = ?';
      params.push(categoria);
    }

    if (fornecedor) {
      query += ' AND fornecedor = ?';
      params.push(fornecedor);
    }

    if (validade === 'vencido') {
      query += ' AND validade IS NOT NULL AND validade < CURDATE()';
    } else if (validade === 'proximo') {
      query += ' AND validade IS NOT NULL AND validade BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)';
    }

    const [rows] = await db.query(query, params);
    return rows;
  },

  create: async (dados, usuarioId) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const { produto,categoria,quantidade,quantidade_minima,valor,unidade_medida,validade,fornecedor } = dados;

      await conn.query(
        `INSERT INTO estoque 
          (produto, categoria, quantidade, quantidade_minima, valor, unidade_medida, validade, fornecedor, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [produto,categoria,quantidade, quantidade_minima,valor,unidade_medida,validade,fornecedor,usuarioId]
      );

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  update: async (id, dados, usuarioId) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const {
        produto, categoria,quantidade,quantidade_minima,valor,unidade_medida,validade,fornecedor
      } = dados;

      await conn.query(
        `UPDATE estoque 
          SET produto=?, categoria=?, quantidade=?, quantidade_minima=?, valor=?, unidade_medida=?, validade=?, fornecedor=?
          WHERE id=? AND usuario_id=?`,
        [
          produto,categoria,quantidade,quantidade_minima,valor,unidade_medida,validade,fornecedor,
          id,
          usuarioId
        ]
      );

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  delete: async (id, usuarioId) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      await conn.query('DELETE FROM estoque WHERE id = ? AND usuario_id = ?', [id, usuarioId]);

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
};
