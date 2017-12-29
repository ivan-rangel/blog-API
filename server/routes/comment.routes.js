let router = require('express').Router();
let CommentController = require('../controllers/comment.controller.js');

router
    .route('/comments')
    .get(CommentController.list);

router
    .route('/comments/:commentId')
    .get(CommentController.listOne);

router
    .route('/comments')
    .post(CommentController.create);
// router
//     .route('/comments/featured')
//     .patch(CommentController.feature);

module.exports = router;