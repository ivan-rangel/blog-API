const User = require('../models/User');
const passport = require('passport')

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
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: err })
                })


        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: err });
        });
};

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
