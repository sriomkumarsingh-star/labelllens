import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the combined routes file
import appRoutes from './routes.js';
import env from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse form data (needed for the POST /login route)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Apply all routes from the router file
app.use('/', appRoutes);
app.use('/dashboard', appRoutes);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});