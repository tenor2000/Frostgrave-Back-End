const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const users = []; //replace with MONGO DB

// Generate SSL certificates (for local development)
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
//   };

authRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ success: true });
});

authRouter.post("/login", (req, res) => {
  res.render("login");
});

module.exports = authRouter;
