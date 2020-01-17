const express = require('express');

const server = express();

const projectRouter = require('./router/projectRouter.js');
const actionRouter = require('./router/actionRouter.js');

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Sprint challenge - Node API!</h2>`);
});


function logger(req, res, next) {
  const { method, originalUrl} = req;
  console.log(`${method} to ${originalUrl} at ${Date.now()}`);
  next();
}

server.use(logger);
server.use('/api/project', projectRouter);
server.use('/api/action', actionRouter);

module.exports = server;
