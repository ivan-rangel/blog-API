const User = require('../models/User');
const passport = require('passport')
const email = require('../utils/mail')

exports.signup = function (req, res) {
    User
        .findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user) {
                return res.status(401).json({ message: "The email address you have entered is already registered" });
            }
            let apiDomain = process.env.API_DOMAIN;
            let newUser = new User();
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.setPassword(req.body.password);
            newUser.setConfirmEmailToken();

            newUser
                .save()
                .then((user) => {
                    var token = user.generateJwt();
                    res.json({ token: token });

                    const locals = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        confirmEmailToken: user.confirmEmailToken,
                        domain: process.env.API_DOMAIN
                    }
                    email
                        .send({
                            template: 'signup',
                            message: {
                                to: user.email
                            },
                            locals: locals
                        })
                        .then(response => {
                            console.log(`Confirm account mail sent to: ${user.email}`);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({ message: err })
                })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: err });
        });
};

exports.confirmEmail = function (req, res) {
    let confirmEmailToken = req.params.confirmEmailToken;
    if (!confirmEmailToken || confirmEmailToken === undefined)
        return res.satus(400).send({ message: 'Invalid confirmation mail token' });
    User
        .findOne({ confirmEmailToken: confirmEmailToken })
        .exec()
        .then(user => {
            user.accountConfirmed = true;
            user.confirmEmailToken = '';
            user
                .save()
                .then(userSaved => {
                    res.redirect('http://localhost:4200');
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
                            console.log(`Welcome mail sent to: ${user.email}`);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({ message: err })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).redirec('http://localhost:4200');
        })
}
exports.login = function (req, res) {
    req.body.email = req.body.email.toLowerCase();
    passport.authenticate('local-email', function (err, user, info) {
        if (err) return res.status(404).send({ err: err });
        if (user) {
            var token = user.generateJwt();
            return res.send({ token: token });
        } else {
            res.status(401).send(info);
        }
    })(req, res);
};

exports.list = function (req, res) {
    User
        .find()
        .lean()
        .exec()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
};
