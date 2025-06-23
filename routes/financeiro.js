
const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');

router.get('/', financeiroController.listar);
router.post('/create', financeiroController.criar);
router.post('/edit/:id', financeiroController.atualizar);
router.get('/delete/:id', financeiroController.deletar);

module.exports = router;
