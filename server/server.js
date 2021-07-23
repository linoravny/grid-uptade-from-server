
const matrixSocketCont = require('./api/controllers/matrixSocketController');
const express = require('express');
var app = express();


const http = require('http').createServer(app);
var port = process.env.PORT || 3000;

/**** S1 - socket.io ****/
global.io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

//socket events
io.on('connection', (socket) => {
  console.log('socket connected');

  let subscribe$ = matrixSocketCont.initMatrix().subscribe((res) => {
    console.log(`get-data`);
    io.emit('get-data', res);
  });

  socket.on('disconnect', () => {
    //unsbscibe
    // matrixSocketCont.disconnect(subscribe$);
    // io.emit('disconnect');
    console.log('socket disconnected');
  });

  //message from client-not nedded.
  // socket.on('my message', (msg) => {
  //   console.log('socket message from client: ' + msg);
  // });

});

/****  S2 - pooling ROUTE ****/
// var routes = require('./api/routes/matrixRoutes');
// routes(app);


http.listen(port, () => {
  console.log('listeninghttp on *:3000');
});

