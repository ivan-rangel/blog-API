
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
