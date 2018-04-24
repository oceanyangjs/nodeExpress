var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connect = require('connect')
var session = require('express-session');
var SessionStore = require("connect-mongo")(session);
var store = new SessionStore({
url: "mongodb://localhost/session",
interval: 120000
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var movieRouter = require('./routes/movie')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(connect.cookieSession({secret : 'fens.me'}));
app.use(session({
	secret : 'fens.me',
	store: store,
	cookie: { maxAge: 900000 }
}));
app.use(function(req, res, next){
	res.locals.user = req.session.user;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = '';
	if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
	next();
});
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.all('/login', notAuthentication);
app.get('/logout', authentication);
app.get('/home', authentication);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movie', movieRouter);
// app.get('/', routes.index);
// app.get('/login', routes.login);
// app.post('/login', routes.doLogin);
// app.get('/logout', routes.logout);
// app.get('/home', routes.home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function authentication(req, res, next) {
	if (!req.session.user) {
		req.session.error='请先登陆';
		return res.redirect('/login');
	}
	next();
}
function notAuthentication(req, res, next) {
	if (req.session.user) {
		req.session.error='已登陆';
		return res.redirect('/');
	}
	next();
}

module.exports = app;
