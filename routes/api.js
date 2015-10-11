var express = require('express');
var router = express.Router();
var fs = require('fs');

/**
 * This router is in /api
 */

fs.readdir('./plugins', function (err, files) {
	if(null != err) return console.log(err);
	for(var i = 0, len = files.length; i < len; i++){
		if(files[i][0] == '.') continue;
		var name = files[i].split('.')[0];
		var handler = require('../plugins/' + files[i]);
		var type = handler.type || 'get';
		router[type]('/' + name, handler);
	}
});

router.get('/', function (req, res) {
	res.redirect('/api/admin');
});

module.exports = router;
