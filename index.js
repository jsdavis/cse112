const log = require('./log');
const server = require('./app');
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  log.info('Server listening on port', PORT);
});
