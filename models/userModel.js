
const db = require('../db');
const bcrypt = require('bcrypt');

module.exports = {
  createUser: async (nome, email, senha) => {
    const hash = await bcrypt.hash(senha, 10);
    await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash]);
  },
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  }
};
