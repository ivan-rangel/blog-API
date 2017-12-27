const EmailTemplate = require('email-templates');
//const hbs = require('handlebars');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'm5mcwxtuvph3rqg5@ethereal.email',
        pass: 'nmQYMPHrwhRrXKFScu'
    }
};

const email = new EmailTemplate({
    message: {
        from: process.env.MAIL_FROM
    },
    transport: mailConfig,
    views: {
        options: {
            extension: 'handlebars' // <---- HERE
        }
    }
})

module.exports = email;
