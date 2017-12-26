let router = require('express').Router();
let PostController = require('../controllers/post.controller.js');

router
    .route('/posts')
    .get(PostController.list);

router
    .route('/posts')
    .post(PostController.create);

module.exports = router;