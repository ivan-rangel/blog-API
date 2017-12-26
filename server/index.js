let post = require('./routes/post.routes.js');

let apiRoutes = function (app) {
    app.use('/api/v1', post);
};

module.exports = apiRoutes;