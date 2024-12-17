const express = require('express');
const axios = require('axios');

const router = express.Router();

// POST /completions
router.post('/', async (req, res) => {
    const { messages, userMessage } = req.body;

    try {
        // Forward the request to the VLLM API
        const vllmApiUrl = 'http://vllm-api:8001/completions';
        const payload = {
            model: "meta-llama/Llama-3.2-3B-Instruct",
            messages: [...messages, { role: "user", content: userMessage }],
            max_tokens: 300,
            temperature: 0.7,
            n: 1,
            stream: false,
        };

        const response = await axios.post(vllmApiUrl, payload, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Forward the response from VLLM to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with VLLM API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
