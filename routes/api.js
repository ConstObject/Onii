var express = require('express');
var http = require('http');
var parseString = require('xml2js').parseString;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cheerio = require('cheerio');
var crunchy = require('../node_modules/crunchyroll');
var anime = require('../node_modules/myanimelist');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/cr/anime/search', function(req, res) {
	crunchy.AnimeSearch(req.body.q, function(result) {
		console.log(JSON.stringify(result));
		res.json(result);
	});
});

router.post('/mal/anime/search', function(req, res) {
	anime.AnimeSearch(req.body.q, req.body.uname, req.body.pword, function(err, statusCode ,result){
		res.json(result);
	});
});

module.exports = router; 
