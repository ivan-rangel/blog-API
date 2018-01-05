let router = require('express').Router();
let PageController = require('../controllers/page.controller.js');
const requireUserAuth = require('../utils/jwt_check').requireUserAuth
const requireAdminAuth = require('../utils/jwt_check').requireAdminAuth

// router
//     .route('/pages')
//     .post(PageController.create);

router
    .route('/pages')
    .get(requireAdminAuth, PageController.list);

router
    .route('/pages/:pageName')
    .get(PageController.listOne);

router
    .route('/pages')
    .patch(requireAdminAuth, PageController.update);

router
    .route('/contact')
    .post(PageController.contact);

module.exports = router;