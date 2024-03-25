const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const clientRouter = require('./routes/clientRouter');
const fundsRouter = require('./routes/fundsRouter');

const app = express();

// Livereload - USE only in development
if (process.env.NODE_ENV === 'development') {
  // Live Reload Server
  const liveReloadServer = require('livereload').createServer();

  // Live reload watch
  liveReloadServer.watch(path.join(__dirname, 'public'));

  // Live reload refresh
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });

  // Livereload Server Script
  app.use(require('connect-livereload')());
}
// view engine setup
app.set('view engine', 'pug');
app.set('views', './views');

if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      // SET ORIGIN IN THE HOST
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use('/', indexRouter);
app.use('/funds', fundsRouter);
app.use('/api/v1/client', clientRouter);

// Submit Basic Info
app.get('/basic', (_, res) => {
  app.use(express.static(`${__dirname}/basic-info`));
  res.sendFile(`${__dirname}/basic-info/index.html`);
});

// Upload documents
app.get('/upload', (_, res) => {
  app.use(express.static(`${__dirname}/upload-id`));
  res.sendFile(`${__dirname}/upload-id/index.html`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
