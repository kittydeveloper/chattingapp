

// ---------------- server/index.js ----------------
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
    // origin: "http://10.243.28.230:3000",
       origin: "http://localhost:3000",
    //  origin: "http://192.168.175.230:3000",
    methods: ["GET", "POST"]
  }
});



socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  
    // socket.on("message", data => {
    //   socketIO.emit("messageResponse", data)
    // })

  //    socket.on("message", async (data) => {
  //   try {

  //     // const { sender_id,Reciever_id,username, message } = data;
  //       const {username,message,sender_id,Reciever_id, messageDate,messageTime} = data;
  //         // const sql = `INSERT INTO ?? (userName, message, messageDate, messageTime, senderName) VALUES (?, ?, ?, ?, ?)`;

  //     console.log(data,"kkkmmmmmmmmmmmmmmmmmmmmmmmmm")
  //     await pool.query(
  //  'INSERT INTO ?? (userName_id, message, messageDate, messageTime,	senderName_id) VALUES (?, ?, ?, ?, ?)',
  //       [username,sender_id,message,messageDate, messageTime, Reciever_id]
  //     );

  //     //  await pool.query(
  //     //   'INSERT INTO messages (sender_id,Reciever_id,username, message) VALUES (?, ?, ?,?)',
  //     //   [sender_id,Reciever_id,username, message]
  //     // );
  //     console.log("dataaaaaaaaaa")
  //     // socketIO.emit("messageResponse", data);
  //   } catch (err) {
  //     console.log('DB insert error:', err);
  //   }
    
  // });

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
      "INSERT INTO messageschat (sender_id, receiver_id, message) VALUES (?, ?, ?)",
      [sender_id, receiver_id, message]
    );

      const savedMessage = { id: result.insertId, sender_id,receiver_id, message };

      // ✅ Emit to all connected clients
      socketIO.emit("receive_message", savedMessage);
  } catch (err) {
    console.log("Error inserting message:", err);
    // res.status(500).json({ error: "Database error" });
  }

    // console.log("Message received:", data);
    // io.emit("receive_message", data);
  });

//   socket.on("messageResponse", async (data) => {
//  try{
//     // console.log(data,'lllllllllllllllllllllll')
//       const { sender_id,Reciever_id,username,receivername} = data;
//       console.log(sender_id,Reciever_id,username,receivername,"hhhhh")

//   // Fetch last N messages
//   const [rows] = await pool.query(
//     `SELECT *
//      FROM ??
//       WHERE userName_id = ? AND senderName_id = ?
//      ORDER BY messageTime ASC
//     `,
//     [username,sender_id,Reciever_id]
//   );

//    const [rows2] = await pool.query(
//     `SELECT *
//      FROM ??
//       WHERE 	userName_id = ? AND senderName_id = ?
//      ORDER BY messageTime ASC
//     `,
//     [receivername,Reciever_id,sender_id]
//   );
//   // console.log(rows,"ss")
//   const updatedRows = rows.map(msg => ({
//   ...msg,
//   status: "you"
// }));

// // Add status: "sender" to each message in rows2
// const updatedRows2 = rows2.map(msg => ({
//   ...msg,
//   status: "sender"
// }));

// const mingledMessages = [...updatedRows, ...updatedRows2];

//   socketIO.emit("messageHistory",mingledMessages);
// }
// catch(err){
//   console.log(err,"jjjjjjjjjjjj")
// }
// });






    socket.on("typing", data => (
      socketIO.broadcast.emit("typingResponse", data)
    ))

    // socket.on("newUser", data => {
    //   users.push(data)
    //   socketIO.emit("newUserResponse", users)
    // })

 

  //    socket.on("newUser", async (data) => {
  //   try {
  //     const { username, email,socket_Id,userid} = data;
  //     // const newUser = { username, email, socketID: socket.id };
  //     // users.push(newUser);
  //     console.log(username, email,socket_Id,userid,"llllllllllllllllllllllllll")

  //     await pool.query(
  //       "INSERT INTO users (userid,username, email, socket_id) VALUES (?, ?, ?,?)",
  //       [userid,username, email, socket_Id]
  //     );

  //     // socketIO.emit("newUserResponse", users);
  //   } catch (error) {
  //     console.error("Error inserting new user:", error);
  //   }
  // });
    // socket.on('disconnect', () => {
    //   console.log('🔥: A user disconnected');
    //   users = users.filter(user => user.socketID !== socket.id)
    //   socketIO.emit("newUserResponse", users)
    //   socket.disconnect()
    // });
     socket.on('disconnect', async () => {
    console.log(`🔥: ${socket.id} disconnected`);
    // users = users.filter(user => user.socketID !== socket.id);

    // try {
    //   await pool.query("DELETE FROM users WHERE socket_id = ?", [socket.id]);
    // } catch (err) {
    //   console.error("Error removing user:", err);
    // }

    // socketIO.emit("newUserResponse", users);
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
  console.log("Server running on http://localhost:4000");
});