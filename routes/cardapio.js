const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', (req, res) => res.redirect('/restaurantes'));
router.get('/u/:usuarioId', menuController.publicoPorUsuario);

module.exports = router;

