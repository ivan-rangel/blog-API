const router = require('express').Router();
const PostController = require('../controllers/post.controller.js');
const requireUserAuth = require('../utils/jwt_check').requireUserAuth
const requireAdminAuth = require('../utils/jwt_check').requireAdminAuth

router
    .route('/posts')
    .get(PostController.list);

router
    .route('/posts/:postId')
    .get(PostController.listOne);

router
    .route('/posts/userId/:userId')
    .get(requireUserAuth, PostController.listByUser);

router
    .route('/posts')
    .post(requireUserAuth, PostController.create);

router
    .route('/posts/featured')
    .patch(requireAdminAuth, PostController.feature);

router
    .route('/posts/shown')
    .patch(requireAdminAuth, PostController.shown);

router
    .route('/posts/:postId')
    .delete(requireAdminAuth, PostController.delete);

module.exports = router;