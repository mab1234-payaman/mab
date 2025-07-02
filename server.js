const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

app.post("/analyze", async (req, res) => {
  const { history = [], strategy = "flat" } = req.body;

  const prompt = `
You are a professional baccarat strategist.
Given this history: [${history.join(", ")}]
And current strategy: ${strategy}

Predict the next outcome (Banker, Player, or Tie), suggest the best strategy to follow next, and provide a confidence percentage and explanation. Return only valid JSON like:
{
  "prediction": "Player",
  "strategy": "1326",
  "confidence": "78%",
  "explanation": "A chop pattern is emerging; the 1326 system is well-suited for this."
}
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const message = completion.data.choices[0].message.content;
    const parsed = JSON.parse(message);
    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      prediction: "Unknown",
      strategy: "N/A",
      confidence: "0%",
      explanation: "Unable to fetch AI strategy. Check your API key or prompt.",
    });
  }
});

app.listen(3001, () => {
  console.log("✅ Baccarat AI server running at http://localhost:3001");
});
