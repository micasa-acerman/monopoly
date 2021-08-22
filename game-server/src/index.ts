import { Server, Socket } from "socket.io";
import { createServer } from 'http';
import Environment from "./common/environment";

const http = createServer();
const io = new Server(http);

io.on("connection", (socket) => {
  console.log(socket);
  socket.emit("hello");
});
console.log(Environment.LISTEN_PORT);
io.listen(Environment.LISTEN_PORT);
