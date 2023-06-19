import express from 'express';
import store from '../models/store.js';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const apiRelease = process.env.API_RELEASE;

// Home Page //
router.get('/', (req, res) => {
  console.log("/home route");
  console.log("path join", path.join(__dirname, '/src', 'index.html'))
  // res.sendFile(path.join(__dirname, '/src', 'index.html'));
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

// About
router.get('/about', (req, res) => {
  console.log("/about route");
  console.log("path join", path.join(__dirname, '/src', 'about.html'))
  res.sendFile(path.join(__dirname, "../src/about.html"));
});

// Add routes //
router.get('/api/template', (req, res) => {
  // Add your code here
})

export default router