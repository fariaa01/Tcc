const Menu = require('../models/menuModel');

module.exports = {
  renderMenu: async (req, res) => {
    try {
      const usuarioId = req.session.userId;
      if (!usuarioId) return res.redirect('/login');

      const pedidos = await Menu.getAll();
      res.render('menu', { pedidos });
    } catch (err) {
      console.error('Erro ao carregar o menu:', err);
      res.status(500).send('Erro ao carregar o menu');
    }
  },

  createPedido: async (req, res) => {
    try {
      const dados = {
        ...req.body,
        foto: req.file ? req.file.filename : null,
        usuario_id: req.session.userId
      };

      await Menu.create(dados);
      res.redirect('/menu');
    } catch (err) {
      console.error('Erro ao criar pedido:', err);
      res.status(500).send('Erro ao criar pedido');
    }
  },

  editarPedido: async (req, res) => {
    try {
      const dados = {
        ...req.body,
        foto: req.file ? req.file.filename : null
      };

      await Menu.update(req.params.id, dados);
      res.redirect('/menu');
    } catch (err) {
      console.error('Erro ao editar pedido:', err);
      res.status(500).send('Erro ao editar pedido');
    }
  },

  excluirPedido: async (req, res) => {
    try {
      await Menu.delete(req.params.id);
      res.redirect('/menu');
    } catch (err) {
      console.error('Erro ao excluir pedido:', err);
      res.status(500).send('Erro ao excluir pedido');
    }
  }
};
