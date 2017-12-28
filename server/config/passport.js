const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/User');
const email = require('../utils/mail');
const apiDomain = process.env.API_DOMAIN;

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
                if (user.facebookId) {
                    return done(null, false, {
                        message: 'Already registered wiht Facebook'
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


passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_SEC_PASS_APP,
    callbackURL: `http://${apiDomain}/api/v1/users/facebook-login/callback`,
    profileFields: ['id', 'email', 'name'],
    passReqToCallback: true,
    enableProof: true
}, (req, accessToken, refreshToken, profile, done) => {
    process.nextTick(function () {
        if (profile.emails[0]) {
            User.findOne({ 'email': profile.emails[0].value }, function (err, user) {

                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User();
                    newUser.facebookId = profile.id;
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.email = profile.emails[0].value;
                    newUser.accountConfirmed = true;

                    newUser.save()
                        .then(userSaved => {
                            const locals = {
                                firstName: userSaved.firstName,
                                lastName: userSaved.lastName,
                                domain: process.env.APP_DOMAIN
                            }
                            email
                                .send({
                                    template: 'welcome',
                                    message: {
                                        to: userSaved.email
                                    },
                                    locals: locals
                                })
                                .then(response => {
                                    console.log(`Welcome mail sent to: ${userSaved.email} via FB login`);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            return done(null, userSaved)
                        })
                        .catch(err => {
                            return done(err)
                        })
                }

            })
        } else {
            return done(null, false);
        }
    })
}));