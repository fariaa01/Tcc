const Estoque = require('../models/estoqueModel');

module.exports = {
  listar: async (req, res) => {
    const { categoria, fornecedor, validade } = req.query;
    const usuarioId = req.session.userId;

    const filtros = {
      categoria: categoria || null,
      fornecedor: fornecedor || null,
      validade: validade || null,
      usuarioId
    };

    const produtosRaw = await Estoque.getFiltrado(filtros);

    const produtos = produtosRaw.map(p => ({
      ...p,
      valor: parseFloat(p.valor)
    }));

    const categoriasUnicas = [...new Set(produtosRaw.map(p => p.categoria))];
    const fornecedoresUnicos = [...new Set(produtosRaw.map(p => p.fornecedor))];

    res.render('estoque', {
      produtos,
      categoriasUnicas,
      fornecedoresUnicos,
      filtrosAtuais: req.query
    });
  },

  criar: async (req, res) => {
    await Estoque.create(req.body, req.session.userId);
    res.redirect('/estoque');
  },

  atualizar: async (req, res) => {
    await Estoque.update(req.params.id, req.body, req.session.userId);
    res.redirect('/estoque');
  },

  deletar: async (req, res) => {
    await Estoque.delete(req.params.id, req.session.userId);
    res.redirect('/estoque');
  }
};
