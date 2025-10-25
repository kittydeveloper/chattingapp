// server.js
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const pool = require("./db"); // Import the database initialization function

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // your React app port
//     methods: ["GET", "POST"],
//   },
// });
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const register = require('./Router/Register_page/Register')
const login =require("./Router/Loginpages/login")
const pool = require("./db");
const path =require('path')
// const { isPromise } = require("util/types");

const app = express();
app.use(express.json());
app.use(cors())
const profileDirectory = path.join(__dirname,'public_image', 'user_profile');
app.use('/profileimages', express.static(profileDirectory));
app.use('/',register)
app.use('/',login)

const server = http.createServer(app);
const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    //  origin: "http://192.168.175.230:3000",
    methods: ["GET", "POST"]
  }
});
let users = {}; // to store userId and their corresponding socketId
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", async(data) => {
    // broadcast message to everyone
//     app.post("/send", (req, res) => {
  const { sender_id, receiver_id, message} = data;
//   db.query(
//     "INSERT INTO messageschat (sender_id, receiver_id, message) VALUES (?, ?, ?)",
//     [sender_id, receiver_id, message],
//     (err, result) => {
//       if (err){
//         console.error("Error inserting message:", err);
//         return res.status(500).json({ error: "Database error" });
//       } 
//       res.json({ success: true, id: result.insertId });
//     }
//   );
// });



  try {
    const [result] = await pool.query(
      "INSERT INTO messageschat (sender_id, receiver_id, message) VALUES (?, ?, ?,)",
      [sender_id, receiver_id, message,status]
    );

      const savedMessage = { id: result.insertId, sender_id,receiver_id, message };

      // ✅ Emit to all connected clients
      io.emit("receive_message", savedMessage);
  } catch (err) {
    console.log("Error inserting message:", err);
    // res.status(500).json({ error: "Database error" });
  }

    // console.log("Message received:", data);
    // io.emit("receive_message", data);
  });

   // Mark delivered when receiver receives
  // socket.on("delivered", async (msgId) => {

  //   await db.query("UPDATE messageschat SET status = 'delivered' WHERE id = ?", [msgId]);
  //   io.emit("update_status", { id: msgId, status: "delivered" });
  // });
//   socket.on("delivered", async (msg) => {
//     console.log(msg.msgId,"iiiidelieverd")
//     const { msgId } = msg;
//     console.log(msgId,"msgId")
//   try {
//     await pool.execute(
//       "UPDATE messageschat SET status = 'delivered' WHERE id = ?",
//       [msg.msgId]
//     );

//     // Notify all clients (or you can emit only to sender if you want)
//     io.emit("update_status", { id: msg.msgId, status: "delivered" });
//   } catch (err) {
//     console.error("Error updating delivered:", err);
//   }
// });

  // Mark read when receiver opens chat
  // socket.on("read", async (msgIds) => {
  //   await db.query("UPDATE messageschat SET status = 'read' WHERE id IN (?)", [msgIds]);
  //   msgIds.forEach((id) => {
  //     io.emit("update_status", { id, status: "read" });
  //   });
  // })

//   socket.on("read", async (msgIds) => {
//     console.log("Marking messages as read:", msgIds);
//   try {
//     if (!Array.isArray(msgIds) || msgIds.length === 0) return;

//     await pool.execute(
//       `UPDATE messageschat SET status = 'read' WHERE id IN (${msgIds.map(() => "?").join(",")})`,
//       msgIds
//     );

//     msgIds.forEach((id) => {
//       console.log(id,"kk")
//       io.emit("update_status", { id, status: "read" });
//     });
//   } catch (err) {
//     console.error("Error updating read:", err);
//   }
// });

 // User registers (userId → socket.id mapping)
socket.on("register", (userId) => {
  console.log(userId,"userid")
  users[userId] = socket.id;
  console.log(`✅ User ${userId} registered with socket ${socket.id}`);
});


// Caller sends an offer to callee
// socket.on("call-user", ({ from, to, offer }) => {
//   console.log(from,to,"fromto",offer,"calluser",users)
//   const targetSocket = users[to];
//   console.log(targetSocket,"targetSocketcalluser")
//   // if (targetSocket) {
//     console.log(targetSocket,"targetSocketcalluserinside")
//     io.to(targetSocket).emit("incoming-call", { from, offer });
//   // }
// });
// socket.on("call-user", ({ from, to, offer }) => {
//   const targetSocket = users[to]; // userId -> socket.id mapping
//   // if (targetSocket) {
//      console.log(targetSocket,"targetSocketcalluserinside")
//     io.to(targetSocket).emit("incoming-call", { from, offer });
//   // }
// });

// Callee sends answer back to caller
// socket.on("answer-call", ({ from, to, answer }) => {
//   console.log(from,to,"fromto",answer,"answer",users)
//   const targetSocket = users[to];
//   console.log(targetSocket,"targetSocketanswecall")
//   // if (targetSocket) {
//     io.to(targetSocket).emit("call-accepted", { from, answer });
//   // }
// });
console.log(users,"lllllllll")
// Exchange ICE candidates
// socket.on("ice-candidate", ({ from, to, candidate }) => {
//   console.log(from,to,"fromto",candidate,"candidate",users)
//   const targetSocket = users[to];
//   // console.log(targetSocket,"targetSocketicee")
//   // if (targetSocket) {
//       console.log(targetSocket,"targetSocketicee1111111111111111111111111111111111111111111111")
//     io.to(targetSocket).emit("ice-candidate", { from, candidate });
//   // }
// });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.get("/messages/:sender_id/:receiver_id", async (req, res) => {
  const { sender_id, receiver_id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM messageschat WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY id ASC",
      [sender_id, receiver_id, receiver_id, sender_id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Database error" });
  }
});
server.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
