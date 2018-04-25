var express = require('express');
var router = express.Router();
var Movie = require('../models/Movie.js')

/* GET home page. */
router.get('/add', function(req, res, next) {
  	if(req.params.name){//update
		return res.render('movie', {
			title:req.params.name+'|电影|管理|moive.me',
			label:'编辑电影:'+req.params.name,
			movie:req.params.name
		});
	} else {
		return res.render('movie',{
			title:'新增加|电影|管理|moive.me',
			label:'新增加电影',
			movie:false
		});
	}
});

router.post('/add', function(req, res, next) {
  	//res.send({'success':true});
  	console.log(req.body.content);
  	console.log(req.body)
	var json = JSON.parse(req.body).content;
	console.log('这是json' + json)
	if(json._id){//update
	
	} else {//insert
		Movie.save(json, function(err){
			if(err) {
				res.send({'success':false,'err':err});
			} else {
				res.send({'success':true});
			}
		});
	}
});

router.get('/:name', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

router.get('/json/:name', function(req, res, next) {
  	Movie.findByName(req.params.name,function(err, obj){
		res.send(obj);
	});
});

module.exports = router;
