const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.requireAdminAuth = function (req, res, next) {
    let bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        let bearer = bearerHeader.split(" ");
        let bearerToken = bearer[1];
        req.token = bearerToken;
        try {
            let user = jwt.verify(req.token, 'MY_SECRET');
            if (user.userType === 'admin') {
                next()
            } else {
                res.status(401).send({ msg: "Unauthorized. Must be Admin" });
            }
        } catch (error) {
            if (error && error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired" });
            } else {
                console.log(error);
                return res.status(403).json({ message: error && error.message ? error.message : "Error while verifying session" });
            }
        }
    } else {
        res.status(401).send({ msg: "Error unathorized" });
    }
};

exports.requireUserAuth = function (req, res, next) {
    let bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        let bearer = bearerHeader.split(" ");
        let bearerToken = bearer[1];
        req.token = bearerToken;
        try {
            let user = jwt.verify(req.token, 'MY_SECRET');
            User
                .findById(user._id)
                .exec()
                .then((newUser) => {
                    if (!newUser) {
                        return res.status(403).json({ message: "Authenticated user is not longer in our records" });
                    }
                    req.userInfo = newUser
                    next();
                });
        } catch (error) {
            if (error && error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired" });
            } else {
                console.log(error);
                return res.status(403).json({ message: error && error.message ? error.message : "Error while verifying session" });
            }
        }
    }
    else {
        return res.status(403).send({ msg: "Error unathorized" });
    }
};