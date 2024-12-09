
let io; // Declare io outside of the module.exports

module.exports.listen = (app) => {
    io = require("socket.io")(app, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
        allowEIO3: true,
        secure: true
    });


    io.on('connection', (socket) => {

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('socketOn', (message) => {
            socket.join(message);
        });
    });

    return io;
}

module.exports.emitMessage = (method, message) => {
    if (io) {
        io.sockets.emit(method, message);
    }
}
