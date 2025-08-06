const Menu = require('../models/menuModel');

module.exports = {
  renderMenu: async (req, res) => {
    try {
      const usuarioId = req.session.userId;
      if (!usuarioId) return res.redirect('/login');

      const pratos = await Menu.getAllByUsuario(usuarioId);
      res.render('menu', { pratos }); 
    } catch (err) {
      console.error('Erro ao carregar o menu:', err);
      res.status(500).send('Erro ao carregar o menu');
    }
  },

  createPrato: async (req, res) => {
    try {
      const dados = {
        ...req.body,
        imagem: req.file ? req.file.filename : null,
        usuario_id: req.session.userId,
        destaque: req.body.destaque ? true : false
      };

      await Menu.create(dados);
      res.redirect('/menu');
    } catch (err) {
      console.error('Erro ao cadastrar prato:', err);
      res.status(500).send('Erro ao cadastrar prato');
    }
  },

  editarPrato: async (req, res) => {
    try {
      const dados = {
        ...req.body,
        imagem: req.file ? req.file.filename : null,
        destaque: req.body.destaque ? true : false
      };

      await Menu.update(req.params.id, dados);
      res.redirect('/menu');
    } catch (err) {
      console.error('Erro ao editar prato:', err);
      res.status(500).send('Erro ao editar prato');
    }
  },

  excluirPrato: async (req, res) => {
    try {
      await Menu.delete(req.params.id);
      res.redirect('/menu');
    } catch (err) {
      console.error('Erro ao excluir prato:', err);
      res.status(500).send('Erro ao excluir prato');
    }
  }
};
