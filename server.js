var net = require('net');

var server = net.createServer((socket) => {
    var add = socket.localAddress;
    socket.write(`add : ${add}\n`);
    socket.write('hello write\n');
    socket.end('hello world!\n ');
   
});

server.on('error', (error) => {
    console.log('error : ', error);
});

server.listen(3000, () => {
    console.log('listen', server.address());
});
