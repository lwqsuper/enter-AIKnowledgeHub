import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_ENDPOINT = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

app.post('/api/chat', async (req, res) => {
  try {
    const { message, messages } = req.body;
    
    // Construct the payload for Bailian API
    // If 'messages' is provided (full history), use it. 
    // Otherwise construct from single 'message'.
    const payload = {
      model: "qwen-max",
      messages: messages || [
        { role: "user", content: message }
      ]
    };

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Bailian API Error:', response.status, errorData);
      return res.status(response.status).json({ error: 'Failed to fetch from AI provider' });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Proxy Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy server running on http://localhost:${PORT}`);
});
