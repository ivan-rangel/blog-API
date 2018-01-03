
const Page = require('../models/Page');
const email = require('../utils/mail');

// exports.list = function (req, res) {
//     Post
//         .find({})
//         .lean()
//         .populate('author')
//         .exec()
//         .then((posts) => {
//             res.json(posts)
//         })
//         .catch((err) => {
//             res.status(500).send(err)
//         })
// };
// exports.listOne = function (req, res) {
//     Post
//         .findById(req.params.postId)
//         .lean()
//         .exec()
//         .then((post) => {
//             res.json(post)
//         })
//         .catch((err) => {
//             res.status(500).send(err)
//         })
// };

// exports.create = function (req, res) {
//     let post = new Post();
//     post.title = req.body.title;
//     post.body = req.body.body;
//     post.author = req.body.author;

//     post
//         .save()
//         .then((post) => {
//             res.send(200)
//         })
//         .catch((err) => {
//             res.status(500).send(err);
//         })

// };

/*Contact us */
exports.contact = function (req, res) {

    const locals = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        message: req.body.message
    }
    email
        .send({
            template: 'contact',
            message: {
                to: 'info@geekbears.com'
            },
            locals: locals
        })
        .then(response => {
            console.log(`Contact mail sent from: ${req.body.email}`);
            res.send({ message: `Contact mail sent from: ${req.body.email}` });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: err });
        })
}
