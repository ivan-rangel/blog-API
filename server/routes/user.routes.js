const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const requireUserAuth = require('../utils/jwt_check').requireUserAuth
const requireAdminAuth = require('../utils/jwt_check').requireAdminAuth
const uploader = require('../utils/uploader').uploader

router
    .route('/users')
    .post(UserController.signup);

router
    .route('/users/profile-img')
    .post(uploader, UserController.uploadProfileImage);

router
    .route('/users/newToken')
    .post(requireUserAuth, UserController.newToken);

router
    .route('/users/login')
    .post(UserController.login);

router
    .route('/users/facebookLogin')
    .get(UserController.facebookLogin);

router
    .route('/users/facebook-login/callback')
    .get(UserController.facebookLoginCb);

router
    .route('/users')
    .get(requireAdminAuth, UserController.list);

router
    .route('/users/confirmEmail/:confirmEmailToken')
    .get(UserController.confirmEmail);

router
    .route('/users')
    .patch(requireUserAuth, requireUserAuth, UserController.update);

router
    .route('/users/:userId')
    .delete(requireAdminAuth, UserController.delete);



module.exports = router;