var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});
// app.get('/', routes.index);
// app.get('/login', routes.login);
// app.post('/login', routes.doLogin);
// app.get('/logout', routes.logout);
// app.get('/home', routes.home);
//登陆
router.get('/login', function(req, res, next) {
  	res.render('login', { title: '用户登陆'});
});
router.post('/login', function(req, res, next) {
  	//res.render('index', { title: 'Express' });
  	var user={
		username:'admin',
		password:'admin'
	}
	if(req.body.username===user.username && req.body.password===user.password){
		req.session.user=user;
		res.redirect('/home');
		console.log(req.session)
	}else{
		req.session.error='用户名或密码不正确';
		// return res.redirect('/login');
		res.redirect('/login');
	}
});
router.get('/logout', function(req, res, next) {
	  //res.render('index', { title: 'Express' });
	  res.redirect('/');
});
router.get('/home', function(req, res, next) {
 //  	var user={
	// 	username:'admin',
	// 	password:'admin'
	// }
	res.render('home', { title: 'Home'});
});

module.exports = router;
