const express = require('express');
const app = express();
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = http.createServer(app); // Create an HTTP server using the Express app
const wss = new WebSocket.Server({ server }); // Attach a WebSocket server to the HTTP server


function broadcast(data) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

wss.on('connection', (ws) => {
    console.log('Client connected');
        ws.on('close', () => {
            console.log('Client disconnected');
        });
});

server.listen(3000, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Server is listening on port 3000');
  });



module.exports ={
    app,
    broadcast
}