const express = require('express');
const path = require('path');
const logger = require('morgan');

// import routes
const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// setup for routes pages
app.use('/', routes);
app.use('/books', books);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  const err = new Error('There is no such page, sorry!');
  err.status = 404;
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.status === 400) {
    res.render('page-not-found');
    console.log(`Oops, something went wrong ${err.status}`);
  } else {
    err.status === 500;
    res.render('error');
    console.log(`Oops, something went wrong ${err.status}`);
  }
});

module.exports = app;

// app.listen(port, function() {
//   console.log('Your app is listening on port: ' + port);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
