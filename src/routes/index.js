const express = require('express');
const dotenv = require('dotenv');
const redis = require("redis");
const shortId = require('shortid');

dotenv.config();

const router = express.Router();
let client = redis.createClient({ host: process.env.REDIS_HOST || '127.0.0.1', port: process.env.REDIS_PORT });
client.on('error', () => client = redis.createClient({ host: '127.0.0.1', port: process.env.REDIS_PORT }) )
client.on('connect', () => console.log('Connected to Redis') )

router.get('/', (req, res) => {
  res.status(200).render('index')
});

router.get('/result', (req, res) => {
  client.get('shortUrl', function(err, reply) {
    res.status(200).render('result', {
      host: req.get('host'),
      shortUrl: reply
    });
  });
});

router.get('/:shortUrl', (req, res) => {
  const shortUrlId = req.params.shortUrl;
  client.get('shortUrl', function(err, reply) {
    if (shortUrlId !== reply) return res.status(404).render('notFound');
    client.get('longUrl', function(err, reply) {
      res.status(200).redirect(reply);
    });
  });
});

router.post('/shrinkUrl', (req, res) => {
  client.set("longUrl", req.body.longUrl, function(err, reply){
    client.get('longUrl', function(err, reply) {
      const shortUrl = shortId.generate(reply);
      client.set("shortUrl", shortUrl, function(err, reply) {
        res.redirect('/result')
      });
    });
  });
});

module.exports = (app) => {
  app.use(router);
  return app;
};
