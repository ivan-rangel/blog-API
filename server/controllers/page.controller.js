
const Page = require('../models/Page');
const email = require('../utils/mail');

exports.list = function (req, res) {
    Page
        .find({})
        .lean()
        .exec()
        .then((pages) => {
            res.json(pages)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
};

exports.listOne = function (req, res) {
    if (!req.params.pageName || req.params.pageName === undefined) {
        return res.status(400).send({ message: 'Page name undefined' });
    }
    Page
        .findOne({ name: req.params.pageName })
        .lean()
        .exec()
        .then((page) => {
            res.json(page)
        })
        .catch((err) => {
            res.status(500).send({ message: err })
        })
};

exports.create = function (req, res) {
    let page = new Page();
    page.name = req.body.name;
    page.content = req.body.content;

    page
        .save()
        .then((page) => {
            res.send({ message: 'Page saved' })
        })
        .catch((err) => {
            res.status(500).send(err);
        })
};

exports.update = function (req, res) {
    if (req.body._id === undefined || !req.body._id) {
        return res.status(400).send({ message: 'Invalid page id' });
    }

    Page
        .findById(req.body._id)
        .exec()
        .then(page => {
            page.content = req.body.content
            page.updatedAt = new Date()
            page
                .save()
                .then((pageSaved) => {
                    res.send({ message: 'Page updated' })
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).send({ message: err });
                })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ message: err });
        })
};

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
