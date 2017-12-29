let router = require('express').Router();
let PostController = require('../controllers/post.controller.js');

router
    .route('/posts')
    .get(PostController.list);

router
    .route('/posts/:postId')
    .get(PostController.listOne);

router
    .route('/posts')
    .post(PostController.create);

router
    .route('/posts/featured')
    .patch(PostController.feature);
router

    .route('/posts/shown')
    .patch(PostController.shown);

module.exports = router;