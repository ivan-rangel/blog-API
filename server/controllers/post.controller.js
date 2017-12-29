
let Post = require('../models/Post');

exports.list = function (req, res) {
    Post
        .find({})
        .lean()
        .populate('author')
        .exec()
        .then((posts) => {
            res.json(posts)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};
exports.listOne = function (req, res) {
    Post
        .findById(req.params.postId)
        .lean()
        .exec()
        .then((post) => {
            res.json(post)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};

exports.create = function (req, res) {
    let post = new Post();
    post.title = req.body.title;
    post.body = req.body.body;
    post.author = req.body.author;

    post
        .save()
        .then((post) => {
            res.send(200)
        })
        .catch((err) => {
            res.status(500).send(err);
        })
};

exports.feature = function (req, res) {
    if (req.body.postId === undefined || !req.body.postId)
        return res.status(400).send({ message: 'Invalid post id' });

    Post
        .findById(req.body.postId)
        .exec()
        .then(post => {
            post.isFeatured = !post.isFeatured;
            post
                .save()
                .then(postSaved => {
                    return res.send(200)
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).send({ message: err })
                })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ message: err })
        })
};

exports.shown = function (req, res) {
    if (req.body.postId === undefined || !req.body.postId)
        return res.status(400).send({ message: 'Invalid post id' });

    Post
        .findById(req.body.postId)
        .exec()
        .then(post => {
            post.isVisible = !post.isVisible;
            post
                .save()
                .then(postSaved => {
                    return res.send(200)
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).send({ message: err })
                })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ message: err })
        })
};
