const express = require('express');
const http = require('http');
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/update', updateRouter);
app.use('/reles', relesRouter);
app.use('/relesUpdate', relesUpdateRouter);

app.use('/ver', verRouter);

// Rota para manipular a solicitação POST
app.post('/enviar-dados', (req, res) => {
  // Configurações do servidor onde você deseja fazer a solicitação POST
  const options = {
    hostname: 'exemplo.com', // Substitua pelo hostname ou endereço IP do servidor
    port: 80, // Porta HTTP padrão
    path: '/caminho/do/endpoint', // O caminho do endpoint onde você deseja enviar a solicitação POST
    method: 'POST', // Método HTTP POST
    headers: {
      'Content-Type': 'application/json', // Defina o tipo de conteúdo apropriado para os dados que você está enviando
    },
  };

  // Os dados que você deseja enviar no corpo da solicitação POST
  const postData = JSON.stringify({
    chave1: 'valor1',
    chave2: 'valor2',
  });

  // Crie a solicitação HTTP
  const req = http.request(options, (response) => {
    let data = '';

    // Receba os dados de resposta
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Lida com a resposta completa
    response.on('end', () => {
      console.log('Resposta do servidor:', data);
      res.send(data); // Envie a resposta de volta para o cliente Express
    });
  });

  // Lida com erros na solicitação
  req.on('error', (error) => {
    console.error('Erro na solicitação:', error);
    res.status(500).send('Erro na solicitação');
  });

  // Envie os dados no corpo da solicitação POST
  req.write(postData);

  // Finalize a solicitação
  req.end();
});

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
