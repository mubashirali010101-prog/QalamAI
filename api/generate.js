export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Configuration Error: GEMINI_API_KEY is missing on Vercel." });
    }

    // Direct Google Gemini API call — 100% Free & Independent
    const response = await fetch(`https://googleapis.com{apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `You are a premium Silicon Valley global marketing copywriter. Write a highly engaging, conversion-focused global marketing ad copy based on this request: ${prompt}` }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || "Gemini API Error");
    }

    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ text: aiText });
  } catch (error) {
    res.status(500).json({ error: "AI Engine Error: " + error.message });
  }
}
