
const express = require("express")
const http = require("http")
const { Server } = require("socket.io");

const PORT = 9000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let i = 0;
function send (res) {
    res.write("data: " + `hello from server ---- [${i++}]\n\n`);
    setTimeout(() => send(res), 1000);
}

app.get("/stream", (req,res) => {
  res.setHeader("Content-Type", "text/event-stream");
  send(res);
})


server.listen(PORT, () => console.log(`Server started at port: ${PORT}`));


/* Client Code 

  let sse = new EventSource("http://localhost:9000/stream");
  sse.onmessage = console.log

*/
