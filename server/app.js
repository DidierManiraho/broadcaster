import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';

import incidentsRoutes from './server/routes/redflags';
import userRoutes from './server/routes/user';

// get setting of app
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('uploads'));

app.get('/', (req, res) => {
  res.json('Broadcaster');
});

app.use(morgan('short'));
app.use('/uploads', express.static('uploads'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use('/api/v1/incident', incidentsRoutes);
app.use('/api/v1/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});


export default app;