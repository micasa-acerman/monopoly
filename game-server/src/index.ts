import { Server, Socket } from "socket.io";
import { createServer } from 'http';
import Environment from "./common/environment";

const http = createServer();
const io = new Server(http,{
  cors: {
    origin: ['http://localhost:3000','https://amritb.github.io/']
  }
});


console.log(Environment.LISTEN_PORT);
io.listen(Environment.LISTEN_PORT);
