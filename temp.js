let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);

let io = require("socket.io")(server);

let port = 8080;

app.use("/", express.static(path.join(__dirname, "dist/chattApp")));

io.on("connection", socket => {
  console.log("new connection made from client with ID=" + socket.id);
  socket.emit("getMyID", socket.id);

  socket.on("newMsg", data => {
    data.timeStamp = getCurrentDate();
    io.sockets.emit("msg", data);
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

function getCurrentDate() {
  let d = new Date();
  return d.toLocaleString();
}
