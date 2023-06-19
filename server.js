import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

import indexRoute from './routes/index.js'
import spotifyApiRoutes from './routes/api/spotify/index.js'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT;

dotenv.config();

app.use(cors());
// app.use('/webhooks*', bodyParser.text({type: 'text/plain'})); //this type is actually the default
// app.use('/webhooks*', bodyParser.raw({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.text());

// Routes //
app.use(indexRoute);
app.use(spotifyApiRoutes);

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '/src/dist')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;