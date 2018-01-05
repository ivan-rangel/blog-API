/** Load libraries **/
require('dotenv').config();

const express = require('express');
const app = express();
//const helmet = require('./server/config/helmet');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const apiRoutes = require('./server/index');
const methodOverride = require('method-override');
const colors = require('colors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const db_url = require('./server/config/db');
const cors = require('cors')

require('./server/config/passport');


app.use('/profile_imgs', express.static(path.join(__dirname, 'profile_imgs')))
/** Protect app **/
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     next();
// });
//helmet(app);
app.use(cors({
    credentials: true,
    //origin: `http://${process.env.APP_DOMAIN}`,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(morgan('dev'))
/** Parse requests **/
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

/** Set up routes **/
apiRoutes(app);
//app.all('*', (req, res) => {});

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