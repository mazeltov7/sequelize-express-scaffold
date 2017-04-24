var express = require('express');
const models = require('../models');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(results) {
  	console.log(`resssssut: ${results}`);
  	res.render('users/index', {users: results});
  });
});

router.post('/create', function(req, res) {

});


module.exports = router;
