
let Comment = require('../models/Comment');

exports.list = function (req, res) {
    Comment
        .find({})
        .lean()
        .populate('author post')
        .exec()
        .then((comments) => {
            res.json(comments)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};

exports.listOne = function (req, res) {
    Comment
        .findById(req.params.commentId)
        .lean()
        .exec()
        .then((comment) => {
            res.json(comment)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};

exports.create = function (req, res) {
    let comment = new Comment();
    comment.content = req.body.content;
    comment.author = req.body.author;
    comment.post = req.body.post;

    comment
        .save()
        .then((comment) => {
            res.send(200)
        })
        .catch((err) => {
            res.status(500).send(err);
        })
};

// exports.feature = function (req, res) {
//     if (req.body.commentId === undefined || !req.body.commentId)
//         return res.status(400).send({ message: 'Invalid comment id' });

//     Comment
//         .findById(req.body.commentId)
//         .exec()
//         .then(comment => {
//             comment.isFeatured = !comment.isFeatured;
//             comment
//                 .save()
//                 .then(commentSaved => {
//                     return res.send(200)
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     return res.status(500).send({ message: err })
//                 })
//         })
//         .catch(err => {
//             console.log(err);
//             return res.status(500).send({ message: err })
//         })

// };
