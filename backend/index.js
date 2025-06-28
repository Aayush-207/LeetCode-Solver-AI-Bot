import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/gemini', async (req, res) => {
  try {
    const { question } = req.body;

    const prompt = `
      Solve this LeetCode question:
      "${question}"

      Provide:
      - Solution code
      - Time complexity
      - Space complexity
      - Better or simpler alternative solution if any
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: prompt }] }
          ]
        }),
      }
    );

    // ✅ If Google rejects the request (bad key, quota, etc.)
    if (!response.ok) {
      console.error(`Gemini API returned error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error('Error details:', text);
      return res.status(500).json({ error: 'Gemini API request failed.' });
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "No solution found.";
    res.json({ solution: content });

  } catch (err) {
    console.error('Backend error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
