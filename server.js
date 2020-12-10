var net = require('net');

var server = net.createServer((socket) => {
    socket.end('hello world');
});

server.on('error', (error) => {
    console.log(error);
});

server.listen(9000, () => {
    console.log('listen', server.address());
});
