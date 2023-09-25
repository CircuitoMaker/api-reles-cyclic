const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const updateRouter = require('./routes/update');
const relesRouter = require('./routes/reles');
const relesUpdateRouter = require('./routes/relesUpdate');
const verRouter = require('./routes/ver');

const app = express();

// Configurar o Express para usar o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para redirecionar de HTTPS para HTTP
app.use(function(req, res, next) {
  // Verifique se a solicitação está sendo feita através de HTTPS
  if (req.secure) {
    // Redirecione para a versão HTTP da URL atual
    return res.redirect('http://' + req.headers.host + req.url);
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/update', updateRouter);
app.use('/reles', relesRouter);
app.use('/relesUpdate', relesUpdateRouter);

app.use('/ver', verRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
