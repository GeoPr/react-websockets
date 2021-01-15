const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {
  const onMessage = message => {
    webSocketServer.clients.forEach(client => {
      client.send(message);
    });
  };

  const onError = e => ws.send(e);

  ws.on('error', onError);
  ws.on('message', onMessage);
});

server.listen(2121, () => console.log('Server has been started !'));
