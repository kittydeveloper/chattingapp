const express = require('express');
const router = express.Router();
const db = require('../../db');

router.post('/login11', (req, res) => {
  const { username, userpassword } = req.body;
  console.log(username,'dd',userpassword)

  if (!username || !userpassword) {
    return res.status(400).json({ error: 'Username and userpassword are required.' });
  }
  db.query('SELECT * FROM register WHERE user_name = ? AND userpassword = ?', [username, userpassword], (err, result) => {
    if (err) { 
      console.log(err,'ll')
      return res.status(500).json({ error: 'Failed to retrieve user details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials. Please check your username and userpassword.' });
    }
    console.log(result,'ll')
    const user = result[0];
    
    // console.log(process.env.JSON_SECERETKEY)
    // const secretKey = process.env.JSON_SECERETKEY
    // const token = jwt.sign({ id: result[0].userid, username: result[0].username }, secretKey, { expiresIn: '2h' });
    // const secretKey = process.env.JSON_SECERETKEY
    // const token = jwt.sign({ id: result[0].userid, username: result[0].username }, secretKey, { expiresIn: '2h' });

    // const secretKey="NASTAF_APPLICATION_DATAKEY@123"

    return res.status(200).json({ message: 'Login successful', user: user });

    // return res.status(200).json({ message: 'Login successful', user: result[0] });
  });
});


router.post('/login', async (req, res) => {
  const { username, userpassword } = req.body;
  console.log(username,userpassword)
  if (!username || !userpassword) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM register WHERE user_name = ? AND userpassword = ?', [username,userpassword]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
// console.log(rows,"kkkk")
    const user = rows[0];

    // const isMatch = await bcrypt.compare(userpassword, user.userpassword);
    // if (!isMatch) {
    //   return res.status(401).json({ error: 'Invalid username or password.' });
    // }

    // Optional: Create JWT token
    // const secretKey = process.env.JSON_SECERETKEY || "default_key";
    // const token = jwt.sign(
    //   { id: user.userid, username: user.user_name },
    //   secretKey,
    //   { expiresIn: '2h' }
    // );

    return res.status(200).json({
      message: 'Login successful',
      user
      // token // Uncomment if using JWT
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/getalluserlogindata/:username', async (req, res) => {
  const { username} = req.params
console.log(username,"kkk")
  

  try {
const sql =` SELECT u.*, r.*
FROM users u
INNER JOIN register r ON u.userid = r.Register_id
WHERE u.userid NOT IN (?)`

// const sql =` SELECT u.*
// FROM register u
// WHERE u.userid NOT IN (?)`


    const [rows] = await db.execute(sql, [username]);

    if (rows.length === 0) {
      
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
// console.log(rows,"kkkk",rows.length)
    const user = rows;

    // const isMatch = await bcrypt.compare(userpassword, user.userpassword);
    // if (!isMatch) {
    //   return res.status(401).json({ error: 'Invalid username or password.' });
    // }

    // Optional: Create JWT token
    // const secretKey = process.env.JSON_SECERETKEY || "default_key";
    // const token = jwt.sign(
    //   { id: user.userid, username: user.user_name },
    //   secretKey,
    //   { expiresIn: '2h' }
    // );

    return res.status(200).json(user);

  } catch (err) {
    console.log('Login error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// fo

module.exports = router;