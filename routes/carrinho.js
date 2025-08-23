// routes/carrinho.js
const express = require('express');
const router = express.Router();

const { mostrarCarrinho } = require('../controllers/carrinhoController');
const { getItemById } = require('../models/cardapioModel');
// Exibe o carrinho
router.get('/', mostrarCarrinho);

router.post('/', async (req, res) => {
  const itemId = req.body.item_id;
  
  if (!req.session.carrinho) req.session.carrinho = [];
  const item = await getItemById(itemId); 
  if (item) req.session.carrinho.push(item);
  res.redirect('/carrinho');
});

module.exports = router;