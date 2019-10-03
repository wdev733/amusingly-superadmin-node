import http from 'http';
import { env, port, ip, apiRoot } from './config';
import express from './services/express';
import api from './api';

const pool = require('./services/mysql');

const app = express(apiRoot, api);
const server = http.createServer(app);

app.get('/', async (req, res) => {
  const links = await pool.query('SELECT * FROM admin');
  console.log(links);
  res.send('<h2>Amusingly</h2>');
});

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      'Express server listening on http://%s:%d, in %s mode',
      ip,
      port,
      env
    );
  });
});

export default app;
