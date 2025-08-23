module.exports = {
  mostrarCarrinho: (req, res) => {
    const carrinho = req.session.carrinho || [];
    res.render('carrinho', { itens: carrinho });
  },
  limparCarrinho: (req, res) => {
    req.session.carrinho = [];
    res.redirect('/carrinho');
  },
  verCarrinho: async (req, res) => {
    const carrinho = req.session.carrinho || [];
    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    res.render('carrinho', { carrinho, total });
  }
};

 