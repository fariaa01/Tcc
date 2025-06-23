const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const router = express.Router();
const menuController = require('../controllers/menuController');


router.get('/', menuController.renderMenu);
router.post('/', upload.single('foto'), menuController.createPedido);
router.post('/editar/:id', upload.single('foto'), menuController.editarPedido);
router.post('/excluir/:id', menuController.excluirPedido);

module.exports = router;
