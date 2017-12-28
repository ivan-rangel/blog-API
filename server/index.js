const post = require('./routes/post.routes');
const user = require('./routes/user.routes');
const page = require('./routes/page.routes');

const apiRoutes = function (app) {
    app.use('/api/v1', post);
    app.use('/api/v1', user);
    app.use('/api/v1', page);
};

module.exports = apiRoutes;