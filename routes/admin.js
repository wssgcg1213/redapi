var express = require('express');
var router = express.Router();

/**
 * This router is in /admin
 */

router.get('/', function(req, res) {
  res.render('index', { 
  	title: 'Api Admin.'
  });
});

module.exports = router;
