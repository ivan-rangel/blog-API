const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');

passport.use('local-email', new LocalStrategy({
    usernameField: 'email'
},
    function (username, password, done) {
        User
            .findOne({ email: username })
            .exec()
            .then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: 'User not found'
                    });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Wrong Password'
                    });
                }
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            })
    }
));


//var domain = process.env.APP_DOMAIN || 'http://dev.dumpling.us';
// passport.use(new FacebookStrategy({
//     clientID: process.env.FB_CLIENT_ID,
//     clientSecret: process.env.FB_CLIENT_SECRET,
//     // callbackURL: domain + '/api/customer/facebookLogin/callback',
//     callbackURL: process.env.APP_DOMAIN + '/api/customer/facebookLogin/callback',
//     profileFields: ['id', 'email', 'name'],
//     passReqToCallback: true,
//     enableProof: true
// }, (req, accessToken, refreshToken, profile, done) => {
//     process.nextTick(function () {
//         if (profile.emails[0]) {
//             User.findOne({ 'email': profile.emails[0].value, isObsolete: false }, function (err, user) {

//                 if (err) {
//                     return done(err);
//                 }

//                 if (user) {
//                     if (user.banned) {
//                         return done(null, false, {
//                             message: '001'
//                         });
//                     } else {
//                         if (user.accountConfirmed) {
//                             return done(null, user);
//                         } else {
//                             user.accountConfirmed = true;
//                             user.save(function (err, usr) {
//                                 if (err) {
//                                     //console.log(err);
//                                     //throw err;
//                                     return done(err);
//                                 }
//                                 return done(null, usr);
//                             });
//                         }
//                     }
//                 } else {
//                     let newUser = new User();
//                     newUser.facebookId = profile.id;
//                     newUser.firstName = profile.name.givenName;
//                     newUser.lastName = profile.name.familyName;
//                     newUser.email = profile.emails[0].value;
//                     newUser.accountConfirmed = true;
//                     newUser.signUp = Date.now();
//                     newUser.notificationType = 'email';
//                     newUser.notificationFrequency = '100';
//                     newUser.creationDate = new Date();


//                     var dumplingCompanyId = "000000000000000000000000";
//                     newUser.save(function (err, user) {
//                         if (err) {
//                             //console.log(err);
//                             //throw err;
//                             return done(err);
//                         }

//                         setTimeout(() => {
//                             User
//                                 .findById(user._id)
//                                 .exec()
//                                 .then((userEmail) => {
//                                     let domain = process.env.APP_DOMAIN || 'http://dev.dumpling.us';
//                                     let url = userEmail._company[0] ? domain + "/company/" + userEmail._company[0] : domain
//                                     var template = new EmailTemplate('./public/views/email-templates/email-confirmation');
//                                     var locals = {
//                                         // firstname: userEmail.firstName,
//                                         domain: domain,
//                                         email: userEmail.email,
//                                         url: url
//                                     };
//                                     let hasReachQuota = require("../app/controllers/user.controller").hasReachQuota;
//                                     let quotaLimitExceeded = require("../app/util/utils").quotaLimitExceeded;
//                                     hasReachQuota(userEmail.email, 2)
//                                         .then((response) => {
//                                             if (response.isDuplicated) {
//                                                 console.log("Duplicated");
//                                             } else if (!response.isReached) {
//                                                 template.render(locals, function (err, results) {
//                                                     if (err) {
//                                                         console.error(err);
//                                                     }
//                                                     transporter.sendMail({
//                                                         from: process.env.MAIL_SENDER,
//                                                         to: userEmail.email,
//                                                         subject: 'dumpling - Welcome to dumpling!',
//                                                         html: results.html,
//                                                         text: results.text
//                                                     }, function (err, responseStatus) {
//                                                         if (err) {
//                                                             console.error(err);
//                                                             return res.status(500).send(err);
//                                                         } else {
//                                                             createEmail(userEmail.email, 'Welcome', 2, 'dumpling - Welcome to dumpling!', url);
//                                                             console.log('Sent User');
//                                                             // res.status(200).send('Everything ok');
//                                                         }
//                                                     });
//                                                 });
//                                             } else {
//                                                 quotaLimitExceeded(userEmail.email, 'Welcome')
//                                                     .then((response) => {
//                                                     })
//                                                     .catch((err) => {
//                                                         console.log(err);
//                                                     });
//                                             }
//                                         })
//                                         .catch((response) => {
//                                             console.log(response);
//                                         })
//                                 })
//                                 .catch((err) => {
//                                     console.log(err)
//                                 })
//                         }, 2000 * 60);

//                         Company.findById(dumplingCompanyId, function (err, company) {
//                             if (company) {
//                                 let followedBy = company.followedBy ? company.followedBy : new Array();
//                                 followedBy.push(user._id);
//                                 company.followedBy = followedBy;
//                                 company.save();
//                             }
//                         });
//                         return done(null, newUser);
//                     });
//                 }

//             })
//         } else {
//             return done(null, false);
//         }
//     })
// }));

// passport.use(new GoogleStrategy({
//     clientID: process.env.GG_CLIENT_ID,
//     clientSecret: process.env.GG_CLIENT_SECRET,
//     callbackURL: domain + '/api/customer/googleLogin/callback',
//     // callbackURL: 'http://localhost:8080/api/customer/googleLogin/callback',
//     profileFields: ['id', 'email', 'name']
// },
//     function (token, refreshToken, profile, done) {
//         process.nextTick(function () {
//             if (profile.emails[0]) {
//                 User.findOne({ 'email': profile.emails[0].value, isObsolete: false }, function (err, user) {

//                     if (err) {
//                         return done(err);
//                     }
//                     if (user) {
//                         if (user.banned) {
//                             return done(null, false, {
//                                 message: '001'
//                             });
//                         } else {
//                             if (user.accountConfirmed) {
//                                 return done(null, user);
//                             } else {
//                                 user.accountConfirmed = true;
//                                 user.save(function (err, usr) {
//                                     if (err) {
//                                         //console.log(err);
//                                         //throw err;
//                                         return done(err);
//                                     }
//                                     return done(null, usr);
//                                 });
//                             }
//                         }
//                     } else {
//                         var newUser = new User();

//                         var nombre = profile.displayName.split(" ");

//                         newUser.googleId = profile.id;
//                         newUser.firstName = nombre[0];
//                         if (nombre[1]) {
//                             newUser.lastName = nombre[1];
//                         } else {
//                             newUser.lastName = " ";
//                         }
//                         newUser.email = profile.emails[0].value;
//                         newUser.accountConfirmed = true;
//                         newUser.username = nombre[0] + profile.id;
//                         newUser.signUp = Date.now();
//                         newUser.notificationType = 'email';
//                         newUser.notificationFrequency = '100';
//                         newUser.creationDate = new Date();
//                         //console.log(newUser);

//                         let dumplingCompanyId = "000000000000000000000000";
//                         newUser.save(function (err, user) {
//                             if (err) {
//                                 //throw err;
//                                 //console.log(err);
//                                 return done(err);
//                             }

//                             setTimeout(() => {
//                                 User
//                                     .findById(user._id)
//                                     .exec()
//                                     .then((userEmail) => {
//                                         let domain = process.env.APP_DOMAIN || 'http://dev.dumpling.us';
//                                         let url = userEmail._company[0] ? domain + "/company/" + userEmail._company[0] : domain
//                                         var template = new EmailTemplate('./public/views/email-templates/email-confirmation');
//                                         var locals = {
//                                             // firstname: userEmail.firstName,
//                                             domain: domain,
//                                             email: userEmail.email,
//                                             url: url
//                                         };
//                                         let hasReachQuota = require("../app/controllers/user.controller").hasReachQuota;
//                                         let quotaLimitExceeded = require("../app/util/utils").quotaLimitExceeded;
//                                         hasReachQuota(userEmail.email, 2)
//                                             .then((response) => {
//                                                 if (response.isDuplicated) {
//                                                     console.log("Duplicated");
//                                                 } else if (!response.isReached) {
//                                                     template.render(locals, function (err, results) {
//                                                         if (err) {
//                                                             console.error(err);
//                                                         }
//                                                         transporter.sendMail({
//                                                             from: process.env.MAIL_SENDER,
//                                                             to: userEmail.email,
//                                                             subject: 'dumpling - Welcome to dumpling!',
//                                                             html: results.html,
//                                                             text: results.text
//                                                         }, function (err, responseStatus) {
//                                                             if (err) {
//                                                                 console.error(err);
//                                                                 return res.status(500).send(err);
//                                                             } else {
//                                                                 createEmail(userEmail.email, 'Welcome', 2, 'dumpling - Welcome to dumpling!', url);
//                                                                 console.log('Sent User');
//                                                                 // res.status(200).send('Everything ok');
//                                                             }
//                                                         });
//                                                     });
//                                                 } else {
//                                                     quotaLimitExceeded(userEmail.email, 'Welcome')
//                                                         .then((response) => {
//                                                         })
//                                                         .catch((err) => {
//                                                             console.log(err);
//                                                         });
//                                                 }
//                                             })
//                                             .catch((response) => {
//                                                 console.log(response);
//                                             })
//                                     })
//                                     .catch((err) => {
//                                         console.log(err)
//                                     })
//                             }, 2000 * 60);
//                             Company.findById(dumplingCompanyId, function (err, company) {
//                                 if (company) {
//                                     let followedBy = company.followedBy ? company.followedBy : new Array();
//                                     followedBy.push(user._id);
//                                     company.followedBy = followedBy;
//                                     company.save();
//                                 }
//                             });

//                             return done(null, newUser);
//                         });
//                     }
//                 })
//             } else {
//                 return done(null, false);
//             }

//         })
//     }
// ));
