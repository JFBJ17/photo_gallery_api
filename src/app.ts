import express from 'express';
import morgan from 'morgan';
import path from 'path';

import indexRoutes from './routes/index';

const app = express();


// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// this folder for this app will be used to store public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;