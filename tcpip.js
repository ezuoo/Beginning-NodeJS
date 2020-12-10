var net = require('net');

var option = {
    port : 9000,
    host : '127.0.0.1'
};

var client = net.connect(option, () => {
    console.log('connected');
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('end', () => {
    console.log('disconnected');
});


