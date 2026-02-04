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

app.get('/api/rss', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    const response = await fetch(decodeURIComponent(url));
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch RSS feed' });
    }

    const data = await response.text();
    res.set('Content-Type', 'application/xml');
    res.send(data);
  } catch (error) {
    console.error('RSS Proxy Error:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
});

app.get('/api/image-proxy', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }

    const decodedUrl = decodeURIComponent(url);
    const response = await fetch(decodedUrl, {
      headers: {
        // Mock a browser User-Agent to bypass some anti-hotlinking protections
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': new URL(decodedUrl).origin // Set referer to the image's origin
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch image');
    }

    // Forward content-type
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.set('Content-Type', contentType);
    }

    // Stream the image data to the response
    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));

  } catch (error) {
    console.error('Image Proxy Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy server running on http://localhost:${PORT}`);
});
