var express = require('express');
const models = require('../models');

var router = express.Router();

// index
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(results) {
  	res.render('users/index', {users: results});
  });
});

// new
router.get('/new', function(req, res, next) {
	res.render('users/new');
});

// create
router.post('/create', function(req, res) {
	models.User.create({
		name: req.body.name,
		age: req.body.age
	}).then(function() {
		res.redirect('/users');
	});
});

// show
router.get('/:user_id', function(req, res) {
	models.User
		.findOne({
			where: {id: req.params.user_id}
		}, {
			include: [ models.Comment]
		})
		.then(function(userResult) {
			userResult.getComments().then(function(commentResults) {
				res.render('users/show', {user: userResult, comments: commentResults});
			})
		});
});

// edit
router.get('/:user_id/edit', function(req, res) {
	models.User
		.findOne({where: {id: req.params.user_id}})
		.then(function(result) {
			res.render('users/edit', {user: result});
		});
});

// update
router.put('/:user_id', function(req, res) {
	models.User
		.update({
			name: req.body.name,
			age: req.body.age
		}, {
			where: {
				id: req.params.user_id
			}
		}).then(function() {
			res.redirect('/users');
		});
});

// destroy
router.delete('/:user_id', function(req, res) {
	models.User
		.destroy({
			where: {
				id: req.body.userId
			}
		}).then(function() {
			res.redirect('/users');
		});
});

// create(comment)
router.post('/:user_id/comments/create', function(req, res) {
	models.Comment.create({
		content: req.body.content,
		user_id: req.params.user_id
	}).then(function() {
		res.redirect(`/users/${req.params.user_id}`);
	})
})

// destroy(comment)


module.exports = router;
