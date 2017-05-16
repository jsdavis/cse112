const log = require('./log');
const app = require('./app');
const socket = require('./server/socket/socket');
const http = require('http');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
socket.createServer(socketIO(server));

server.listen(PORT, () => {
  log.info('Server listening on port', PORT);
});
