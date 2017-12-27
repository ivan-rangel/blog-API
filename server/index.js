const post = require('./routes/post.routes');
const user = require('./routes/user.routes');

const apiRoutes = function (app) {
    app.use('/api/v1', post);
    app.use('/api/v1', user);
};

module.exports = apiRoutes;