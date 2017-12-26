/** Load libraries **/
require('dotenv').config();

const express = require('express');
const app = express();
//const helmet = require('./server/config/helmet');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./server/index');
const methodOverride = require('method-override');
const colors = require('colors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const db_url = require('./server/config/db');

/** Protect app **/
//helmet(app);
app.use(morgan('dev'))
/** Parse requests **/
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

/** Angular DIST output folder **/
app.use(express.static(path.join(__dirname, 'dist')));

/** Set up routes and frontend **/
apiRoutes(app);
app.all('*', (req, res) => { res.sendFile(path.join(__dirname, 'dist/index.html')); });

/** Attempt to connect the DB **/
mongoose.Promise = global.Promise;
let dbConnection = mongoose.connect(db_url, {
    useMongoClient: true,
});
dbConnection
    .then((db) => {
        /** Start server **/
        console.log('Database connection established'.green)
        app.listen(process.env.PORT || 3000, () => { console.log(`Server running on: ${process.env.PORT}`.green); });
    })
    .catch((err) => {
        console.log(err);
    })