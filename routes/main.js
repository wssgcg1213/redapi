/**
 * Created by Liuchenling on 9/17/14.
 */
var express = require('express');
var router = express.Router();

/**
 * This router is in /
 */

router.get('/', function(req, res) {
    res.render('index', {
        title: 'Api Admin.'
    });
});

module.exports = router;
