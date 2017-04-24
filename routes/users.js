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

router.get('/new', function(req, res, next) {
	res.render('users/new');
});

router.post('/create', function(req, res) {
	models.User.create({
		name: req.body.name,
		age: req.body.age
	}).then(function() {
		res.redirect('/users');
	});
});

router.get('/:user_id', function(req, res) {
	models.User
		.findOne({where: {id: req.params.user_id}})
		.then(function(result) {
			res.render('users/show', {user: result});
		});
});

module.exports = router;
