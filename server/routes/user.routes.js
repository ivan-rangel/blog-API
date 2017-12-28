const router = require('express').Router();
const UserController = require('../controllers/user.controller');
// var requireAdminAuth = require('../util/jwtcheck').requireAdminAuth;
// var requireUserAuth = require('../util/jwtcheck').requireUserAuth;

// router.route('/admin/register')
//     .post(UserController.adminRegister);

// router.route('/admin/login')
//     .post(UserController.adminLogin);

router
    .route('/users')
    .post(UserController.signup);

router
    .route('/users/login')
    .post(UserController.login);

router
    .route('/users/facebookLogin')
    .get(UserController.facebookLogin);

router
    .route('/users/facebook-login/callback')
    .get(UserController.facebookLoginCb);

// router
//     .route('/users')
//     .get(UserController.list);
router
    .route('/users/confirmEmail/:confirmEmailToken')
    .get(UserController.confirmEmail);

// router.route('/customer/confirmEmail/:token').get(UserController.confirmEmail);

// router.route('/customer/verifyPhone/:token').get(UserController.verifyPhone);

// router.route('/forgot')
//     .post(UserController.forgotPassword);

// router.route('/reset/:token')
//     .get(UserController.resetPasswordToken);

// router.route('/reset/password')
//     .post(UserController.resetPassword);

// router.route('/customer/login')
//     .post(UserController.userLogin);

// router.route('/admin/customers')
//     .get(requireAdminAuth, UserController.adminGetCustomers)
//     .put(requireAdminAuth, UserController.adminPutCustomers);

// router.route('/customer')
//     .put(requireUserAuth, UserController.putCostumer);

// router.route('/customer/password')
//     .put(requireUserAuth, UserController.costumerPutPassword);

// router.route('/customer/facebookLogin')
//     .get(UserController.facebookLogin);

// router.route('/customer/facebookLogin/callback')
//     .get(UserController.facebookLoginCallback);

// router.route('/customer/googleLogin')
//     .get(UserController.googleLogin);

// router.route('/customer/googleLogin/callback')
//     .get(UserController.googleLoginCallback);

// router.route('/customer/updateCompanyInfo')
//     .post(UserController.updateCompanyInfo);

// router.route('/customer/upsert/:id')
//     .get(requireUserAuth, UserController.customerUpsert);

// router.route('/customer/doUpsert').post(requireUserAuth, UserController.customerDoUpsert);

// router.route('/admin/customers/ban').post(requireAdminAuth, UserController.adminBanCustomer);

// router.route('/admin/customers/delete').post(requireAdminAuth, UserController.adminDeleteCustomer);

// router.route('/admin/customers/DoObsolete').post(requireUserAuth, UserController.adminDoCustomerObsolete);

// router.route('/customer/sendVerificationToken').post(requireUserAuth, UserController.sendVerificationToken);

// router.route('/admin/customers/export').get(requireAdminAuth, UserController.adminExportAsCSV);

// router.route('/user/:id').get(requireAdminAuth, UserController.get);

// router.route('/user').get(requireAdminAuth, UserController.get);

module.exports = router;