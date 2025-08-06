const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const menuController = require('../controllers/menuController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/', menuController.renderMenu);
router.post('/create', upload.single('imagem'), menuController.createPrato);
router.post('/edit/:id', upload.single('imagem'), menuController.editarPrato);
router.post('/delete/:id', menuController.excluirPrato);

module.exports = router;
