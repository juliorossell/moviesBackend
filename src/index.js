import  app  from "./app";
import './database'
import { Server as webSocketServer } from 'socket.io'
import http from 'http'


const httpServer = http.createServer(app);
const io = new webSocketServer(httpServer, {
    cors: {
        origin:'*', 
        methods: ['GET', 'POST', 'DELETE' ,'PUT'],
        allowedHeaders:[
            'Content-Type'
        ]
    }
});

io.sockets.on('connection', socket => {
    console.log('nueva conexion', socket.id);

    socket.on('client:userLogged', (res) => {
        const data = res;
        socket.broadcast.emit('server:disconnectedAnotherUser',  data);
    }); 

    socket.on('disconnect', ()=> {
        console.log('user disconnected');
    });
})


httpServer.listen(3000);