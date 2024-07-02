const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let messages = [];

// Endpoint para obtener los mensajes
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Endpoint para enviar un nuevo mensaje
app.post('/messages', (req, res) => {
    const { username, text } = req.body;
    if (username && text) {
        const message = { username, text, timestamp: new Date() };
        messages.push(message);
        res.status(201).json(message);
    } else {
        res.status(400).json({ error: 'Username and message text are required' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
