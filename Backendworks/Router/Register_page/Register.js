const express = require('express');
const router = express.Router();
const db = require('../../db');
const multer = require('multer');
// const path = require('path');

router.post('/register', async (req, res) => {
  const { user_name, Email, password } = req.body;
  console.log(user_name, Email, password, "jh")

  if (!user_name || !Email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO register (user_name, Email, userpassword) VALUES (?, ?, ?)",
      [user_name, Email, password]
    );

    // const dynamicTableName = `${user_name}`;
    // const createTableQuery = `
    //     CREATE TABLE IF NOT EXISTS ${dynamicTableName} (
    //         id INT AUTO_INCREMENT PRIMARY KEY,
    //         userName_id VARCHAR(255),   
    //         message VARCHAR(1000),      
    //         messageDate VARCHAR(255),    
    //         messageTime VARCHAR(255),    
    //         senderName_id VARCHAR(255)      
    //     )
    // `;
    // await db.query(createTableQuery);
    res.status(200).json({
      message: "User registered successfully.",
      userId: result.insertId,
    });
  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public_image/user_profile')
  },
  filename: (req, file, cb) => {


    cb(null, `${file.fieldname}_${Date.now()}-${file.originalname}`);
  },



})

const uploadfile = multer({ storage: storage });



router.post('/profile_images/:userid', uploadfile.single('Profile_image'), async(req, res) => {
  try {
  const fileName = req.file.filename;
  // console.log(req.file)
  const user_id = req.params.userid;

   

    
    // Update query
    const sql = "Update register set Profile_picture = ? where  Register_id= ?";

    const [result] = await db.query(sql, [
     fileName, user_id
    ]);


    return res.status(200).json(result);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
});


router.post('/updateprofiledata/:userid', async (req, res) => {
  try {
    const { Bio_data, Gender, Age, Email, Interested } = req.body;
    const { userid } = req.params;

    // Ensure required fields are not undefined
    if (!userid || !Email) {
      return res.status(400).json({ error: "Missing userid or email" });
    }
console.log(req.body,'mmmmmmmmmmmmmmmmmmmmmmmmm')
    // Ensure Interested is a string
    const interestedValue = Array.isArray(Interested) ? Interested.join(", ") : Interested;
console.log(interestedValue)
    // Update query
    const sql = `
      UPDATE register
      SET Email = ?, Bio_data = ?, Age = ?, Gender = ?, Interested = ?
      WHERE Register_id = ?
    `;

    const [result] = await db.query(sql, [
      Email,
      Bio_data,
      Age,
      Gender,
      interestedValue,
      userid,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch updated user
    

    return res.status(200).json(result);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
});





router.get('/getprofileimage/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const [rows] = await db.execute('SELECT Profile_picture FROM register WHERE Register_id = ?', [userid]);
    
    // console.log("Query result:", rows);

    if (rows.length === 0) {
      return res.status(404).send('Image not found');
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).send("Internal Server Error");
  }
});

  
router.get('/getuserdata/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const [rows] = await db.execute('SELECT Email,Bio_data, Gender,Age,Interested FROM register WHERE Register_id = ?', [userid]);
    
    // console.log("Query result:", rows);

    if (rows.length === 0) {
      return res.status(404).send('Image not found');
    }

    res.status(200).json(rows);
  } catch (err) {
    console.log("Query error:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/chats/:userId", async(req, res) => {
  const { userId } = req.params; // logged-in user ID
try{
  const sql = `
    SELECT 
      u.Register_id AS userId,
      u.user_name,
      u.Profile_picture,
      m.message AS lastMessage,
      m.created_at AS lastMessageTime
    FROM register u
    JOIN (
      SELECT 
        CASE 
          WHEN sender_id = ? THEN receiver_id
          ELSE sender_id
        END AS chatUser,
        MAX(created_at) AS lastTime
      FROM messageschat
      WHERE sender_id = ? OR receiver_id = ?
      GROUP BY chatUser
    ) sub ON u.Register_id = sub.chatUser
    JOIN messageschat m 
      ON ((m.sender_id = ? AND m.receiver_id = u.Register_id) OR (m.sender_id= u.Register_id AND m.receiver_id = ?))
     AND m.created_at = sub.lastTime
    ORDER BY m.created_at DESC
  `;

   const [rows] = await db.query(sql, [userId, userId, userId, userId, userId]);
    res.json(rows);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});
 




module.exports = router