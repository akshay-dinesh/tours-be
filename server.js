const mongoose = require('mongoose');
const dotenv = require('dotenv');

// console.log('HELLo');
// process.on('uncaughtException', (err) => {
//   console.log('Uncaught exception. Shutting down...');
//   console.log(err.name, err.message, err);
//   process.exit(1);
// });

dotenv.config({
  path: './config.env',
});
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
console.log(port);
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});

// Closing server and then exiting the process
// process.exit(0) = success
// process.exit(1) = uncalled exception
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejected. Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
