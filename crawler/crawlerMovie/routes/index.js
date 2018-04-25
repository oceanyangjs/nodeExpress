var express = require('express');
var router = express.Router();
var myUtil = require('../myUtil.js');
//var jsdom = require('jsdom')
//var window = jsdom.jsdom().defalutView;
//var $ = require('jquery');
var $ = require('cheerio')//

/* GET home page. */
router.get('/', function(req, res, next) {
  	var url="http://movie.douban.com/subject/11529526";
  	//var url = "https://nba.hupu.com/games/playbyplay/155829";
	console.log(url);
	myUtil.get(url,function(content,status){
		console.log("status:="+status);
		var movie={}
		//利用jq提取红色文字
		movie.name = $(content).find('span[property="v:itemreviewed"]').text();
		movie.director = $(content).find('#info span:nth-child(1) a').text();
		console.log(movie);
		res.send(content);
	})
});

module.exports = router;
