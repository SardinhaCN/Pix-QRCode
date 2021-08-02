const createError = require('http-errors'),
 express = require('express'),
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan');

let app = express();
let indexRouter = require('./routes/index');
let apiRouter = require('./routes/api');

// configuração do motor de vizualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api', apiRouter);


// capturar 404 e encaminhar para o manipulador de erros
app.use(function(req, res, next) {
  next(createError(404));
});

// manipulador de erros
app.use(function(err, req, res, next) {
  // definir locais, fornecendo apenas erros no desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // renderizar a página de erro
  res.status(err.status || 500);
  res.render('pages/404', {
    status: err.status || 500,
    error: res.locals.error
  });
});

module.exports = app;
