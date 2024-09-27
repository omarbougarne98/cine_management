const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const environment = require('./environments');
const db = require('./startup/db');
const userRoutes = require('./src/routes/user.route');
const authRoutes = require('./src/routes/auth.route');
const movieRoutes = require('./src/routes/movie.route');
const roomRoutes = require('./src/routes/room.auth');
const sessionRoutes = require('./src/routes/session.route');
const error = require('./src/middleware/errorMiddleware');
const winston = require('winston');
const app = express();
require('express-async-errors');
require('./startup/config')(); 
require('./startup/db')();
require('./startup/logging')();
require('./startup/validating')();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);  
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/sessions', sessionRoutes);

app.use(error);

app.listen(environment.port, () => {
    winston.info(`App listening on url: http://localhost:${environment.port}`);
});
