var express = require('express');
var http = require('http');
var parseString = require('xml2js').parseString;
var router = express.Router();
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
var anime = require('../node_modules/myanimelist');
var cheerio = require('cheerio');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
	/*var options = {
		host: "crunchyroll.com",
		port: 80,
		method: "GET",
		path: "/the-irregular-at-magic-high-school/more",
		headers: {
			'Referer': 'http://www.crunchyroll.com/one-week-friends/more',
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
		}
	};

	http.request(options, function(res){
		res.on('data', function(chunk) {
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			console.log('Body: ' + chunk.toString());
			$ = cheerio.load(chunk.toString());
			//console.log('Info: ' + $('.series-extended-information').text());					
		});
	}).end();*/
	res.render('index', { title: 'Express' });
});

/*POST to Add User Service*/
router.post('/adduser', function(req, res){

	// Set out internal DB variable
	var db = req.db;

	var username = req.body.username;
	var useremail = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({ 
		"username" : username,
		"email" : useremail
	}, function(err, doc){
		if(err){
			res.send("There was a problem adding the information to the database.");
		}
		else {
			res.location("userlist");
			res.redirect("userlist")
		}
	});
});

var info;

router.get('/MAL', function(req, res) {
	
	/*var cipher = crypto.createCipher('aes-256-cbc', "PASSWORD");
	var decipher = crypto.createDecipher('aes-256-cbc', "PASSWORD");

	var encryptedPassword = cipher.update("Austin", 'utf8', 'base64');
	encryptedPassword = encryptedPassword + cipher.final('base64');
	console.log("Ecnrypted: " + encryptedPassword);

	var decryptedPassword = decipher.update(encryptedPassword, 'base64', 'utf8');
	decryptedPassword = decryptedPassword + decipher.final('utf8');

	console.log("Decrypted: " + decryptedPassword);*/

	res.render("mal", {title:"Onii-Channel - Anime Search"})
	
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

module.exports = router;
