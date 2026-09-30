import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname));

// Main Route to serve the website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Test API to check if backend is working
app.get('/api/test', (req, res) => {
    res.json({ message: "QalamAI Backend Engine is fully active!" });
});

app.listen(PORT, () => {
    console.log(`QalamAI Engine is running globally on http://localhost:${PORT}`);
});
