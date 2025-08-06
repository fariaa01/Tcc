const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const cardapioController = require('../controllers/cardapioController');

router.get('/', cardapioController.exibirCardapio);

module.exports = router;    