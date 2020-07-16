const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./routes');

dotenv.config();
const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));

if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

routes(app);

app.use('*', (req, res) => {
  res.status(404).render('notFound');
});

const server = http.createServer(app);

const current_port = process.env.PORT || 8080;
server.on('listening', () => {
  console.log(`Listening on port ${current_port}`);
});

if(process.env.NODE_ENV !== 'test') {
  server.listen(current_port);
}

module.exports = server;
