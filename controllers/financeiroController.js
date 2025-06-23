const Financeiro = require('../models/financeiroModel');

module.exports = {
  listar: async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.redirect('/login');

      const dados = await Financeiro.getAll(userId);

      const totalEntradas = dados
        .filter(d => d.tipo === "entrada")
        .reduce((acc, cur) => acc + parseFloat(cur.valor || 0), 0);

      const totalSaidas = dados
        .filter(d => d.tipo === "saida")
        .reduce((acc, cur) => acc + parseFloat(cur.valor || 0), 0);

      const saldoFinal = totalEntradas - totalSaidas;

      res.render('financeiro', {
        dados,
        totalEntradas: totalEntradas.toFixed(2),
        totalSaidas: totalSaidas.toFixed(2),
        saldoFinal: saldoFinal.toFixed(2)
      });
    } catch (error) {
      console.error("Erro ao listar financeiro:", error);
      res.status(500).send("Erro ao carregar os dados financeiros.");
    }
  },

  criar: async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.redirect('/login');

      const { tipo, categoria, valor, data } = req.body;

      await Financeiro.create({ tipo, categoria, valor, data }, userId);

      if (req.headers['content-type'] === 'application/json') {
        return res.status(200).json({ success: true });
      }

      res.redirect('/financeiro');
    } catch (error) {
      console.error("Erro ao criar lançamento:", error);

      if (req.headers['content-type'] === 'application/json') {
        return res.status(500).json({ success: false, message: 'Erro ao criar lançamento financeiro.' });
      }

      res.status(500).send("Erro ao criar lançamento financeiro.");
    }
  },

  atualizar: async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.redirect('/login');

      await Financeiro.update(req.params.id, req.body, userId);
      res.redirect('/financeiro');
    } catch (error) {
      console.error("Erro ao atualizar lançamento:", error);
      res.status(500).send("Erro ao atualizar lançamento.");
    }
  },

  deletar: async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.redirect('/login');

      await Financeiro.delete(req.params.id, userId);
      res.redirect('/financeiro');
    } catch (error) {
      console.error("Erro ao deletar lançamento:", error);
      res.status(500).send("Erro ao deletar lançamento.");
    }
  }
};
