let router = require('express').Router();
let PageController = require('../controllers/page.controller.js');

// router
//     .route('/posts')
//     .get(PostController.list);

router
    .route('/contact')
    .post(PageController.contact);

module.exports = router;