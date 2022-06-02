const express = require("express");
const cors = require("cors");
const authorize = require("./middleware/authorize");
const app = express();
const pool = require("./model/user_model");
const bcrypt = require("bcrypt");
const generateJWT = require("./auth/jwtoken");

const PORT = 3001;

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json({ msg: "Email already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (email, full_name, password) VALUES ($1, $2, $3) RETURNING *",
      [email, fullName, encryptedPassword]
    );

    const jwToken = generateJWT(newUser.rows[0].user_id);

    res.status(201).json({ msg: "Account Created Successfully", jwToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("User not found.");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Email/Password mismatch.");
    }

    const jwToken = generateJWT(user.rows[0].user_id);

    res.status(200).json({ jwToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/verify", authorize, (req, res) => {
  try {
    res.json({ authenticated: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
