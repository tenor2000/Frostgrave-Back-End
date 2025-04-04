import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

const users = []; //replace with postgres db

// Generate SSL certificates (for local development)
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
//   };

authRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ success: true });
});

authRouter.post('/login',  (req, res) => {
  res.render('login');
});



export default authRouter