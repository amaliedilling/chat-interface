const express = require('express');
const cors = require('cors');
const vllmRoutes = require('./routes/vllm');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Allow cross-origin requests

// Routes
app.use('/vllm', vllmRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Placeholder route for /completions
{/*
app.post('/completions', (req, res) => {
    const { messages, userMessage } = req.body;

    // Example response (mocked for now)
    const mockResponse = {
        assistantMessageContent: "This is a mocked response from the backend.",
    };

    console.log('Received messages:', messages);
    console.log('User message:', userMessage);

    res.json(mockResponse);
});
*/}

// Start server (the server isnt acutally running on localhost, but on the IP address of the machine)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
