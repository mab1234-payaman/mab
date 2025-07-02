# Baccarat Backend API

This is a Node.js Express server that connects to OpenAI to analyze baccarat game history and provide AI-powered betting suggestions.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file:
```
OPENAI_API_KEY=your-key-here
```

3. Run the server:
```
npm start
```

## Endpoint

`POST /analyze`

### Body:
```json
{
  "history": ["Banker", "Player", "Banker"],
  "strategy": "martingale"
}
```

### Response:
```json
{
  "prediction": "Player",
  "strategy": "1326",
  "confidence": "78%",
  "explanation": "Based on recent chop pattern..."
}
```
