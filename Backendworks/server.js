const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Allow all origins for testing
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // When a user connects, send back their own ID
  socket.emit("me", socket.id);

  // When a user tries to call another user
  socket.on("call_user", (data) => {
    console.log(`User ${data.from} is calling ${data.userToCall}`);
    io.to(data.userToCall).emit("call_user", {
      signal: data.signalData,
      from: data.from,
    });
  });

  // When the user answers the call
  socket.on("answer_call", (data) => {
    console.log(`User answering call: ${data.to}`);
    io.to(data.to).emit("call_accepted", data.signal);
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.broadcast.emit("call_ended");
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
