const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).render('index')
});

module.exports = (app) => {
  app.use(router);
  return app;
};
