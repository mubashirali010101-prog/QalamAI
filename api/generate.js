import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { prompt } = req.body;
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a premium Silicon Valley global marketing copywriter. Write highly engaging, conversion-focused ad copies based on user input.' },
        { role: 'user', content: prompt }
      ],
    });

    res.status(200).json({ text: response.choices.message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
