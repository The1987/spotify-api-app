import express from 'express';
import store from '../models/store.js';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
const router = express.Router();
const apiRelease = process.env.API_RELEASE;

// Add routes //
router.get('/api/template', (req, res) => {
    // Add your code here
})

export default router