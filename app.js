const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'segredo_super_secreto',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/auth'));
app.use('/relatorios', require('./routes/relatorios'));
app.use('/empresa', require('./routes/empresa'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/funcionarios', require('./routes/funcionario'));
app.use('/estoque', require('./routes/estoque'));
app.use('/financeiro', require('./routes/financeiro'));
app.use('/menu', require('./routes/menu'));

app.get('/', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.redirect('/menu');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});