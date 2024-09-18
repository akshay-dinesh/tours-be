const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLERS

// // GET Request
// app.get('/api/v1/tours', getAllTours);
// // Responding to URL Params
// app.get('/api/v1/tours/:id', getTour);
// // POST Request
// app.post('/api/v1/tours', createTour);
// // PATCH Request
// app.patch('/api/v1/tours/:id', updateTour);
// // DELETE Request
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES
// Methods chaining instead of manually writing them like above (Line 90 - 99)

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.statusCode = 404;
  // err.status = 'fail';
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
// 4) START SERVER
module.exports = app;
