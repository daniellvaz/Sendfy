const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set("views", path.join(__dirname, "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  try {
    return res.render("pages/chat");
  } catch (error) {
    return res.render("pages/error", { error: error.message });
  }
});

app.get("/errors", (req, res) => {
  return res.render("pages/error");
});

io.on("connection", (socket) => {
  socket.on("message", ({ message, username }) => {
    io.emit("message", { username, message });
  });
});

server.listen(3000, console.log("server is running"));
