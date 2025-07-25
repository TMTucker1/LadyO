# Lady O Chat

A sophisticated chat interface featuring Lady O, an AI with a mysterious and alluring personality. Now powered by OpenRouter.ai for dynamic conversations.

**Note: This application is designed for mature audiences and may include adult themes and content.**

## Features

- **Elegant Chat Interface**: Dark, mysterious theme matching Lady O's persona
- **Timed Sessions**: 3-minute chat sessions with purchase options for more time
- **AI-Powered Responses**: Dynamic conversations using OpenRouter.ai API
- **Sophisticated Character**: Lady O responds with elegance, wit, and sensuality
- **Mature Content**: Open to adult conversations and NSFW topics
- **Tip Integration**: Support the creator through Buy Me a Coffee

## Setup Instructions

### 1. Get OpenRouter API Key
1. Visit [OpenRouter.ai](https://openrouter.ai/keys)
2. Create an account and generate an API key
3. Note: Free models are available, no payment required for basic usage

### 2. Configure API Key
1. Copy `secrets.example.js` to `secrets.js`
2. Replace `'your-openrouter-api-key-here'` with your actual API key
3. Optionally change the model (free options available)

### 3. Run the Application

**Option A: Simple File Opening**
1. Open `index.html` directly in a web browser
2. Start chatting with Lady O
3. Your first message will start the 3-minute timer

**Option B: Local Server (Recommended if you get CORS errors)**
1. **Quick start**: Run `./start-server.sh` (tries Python, then Node.js)
2. **Python method**: Run `python3 server.py` in the project directory
3. **Node.js method**: Run `npm install express` then `node server.js`
4. Open your browser to `http://localhost:8000`

## Development & Debugging

### Debug Functions
The application includes built-in debugging functions accessible from the browser console:

- `checkAccount()` - Comprehensive test of your OpenRouter account and API access
- `debugChat("your message")` - Test the chat API with a specific message
- `testApiKey()` - Quick validation of your API key

### Usage
1. Open browser developer tools (F12)
2. Go to Console tab
3. Run any debug function: `checkAccount()`

## Troubleshooting

### 401 Authentication Error
If you see "No auth credentials found":
1. **Check API Key**: Make sure your API key in `secrets.js` is correct and starts with `sk-or-v1-`
2. **File Loading**: Open browser developer tools (F12) and check the Console tab for any errors
3. **Use Local Server**: Try running with `python3 server.py` instead of opening the HTML file directly
4. **Clear Cache**: Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)

### CORS Errors
If you see cross-origin request errors:
1. Use the local server method (Option B above)
2. Make sure you're accessing via `http://localhost:8000` not `file://`

### Debug Information
Open browser developer tools (F12) to see debug information in the Console tab that will help identify configuration issues.

## Available Models

### Free Models (No cost)
- `meta-llama/llama-3.1-8b-instruct:free`
- `microsoft/phi-3-mini-128k-instruct:free`
- `google/gemma-2-9b-it:free`

### Paid Models (Better quality)
- `anthropic/claude-3.5-sonnet`
- `openai/gpt-4o`
- `meta-llama/llama-3.1-70b-instruct`

## File Structure

```
├── index.html          # Main HTML file
├── script.js           # JavaScript with OpenRouter integration
├── style.css           # Styling for the chat interface
├── secrets.js          # API configuration (create from example)
├── secrets.example.js  # Example configuration file
├── server.py           # Python development server
├── server.js           # Node.js development server  
├── start-server.sh     # Automatic server startup script
├── .gitignore         # Excludes secrets from version control
└── README.md          # This file
```

## Security

- The `secrets.js` file is automatically ignored by git
- Never commit your API key to version control
- Keep your API key secure and private

## Character

Lady O is an AI persona with:
- Sophisticated and elegantly seductive speech
- Playfully dominant and mysterious personality
- Open to mature conversations and adult topics
- Witty, charming responses with subtle danger
- Uses terms like "darling", "dear", "my sweet", "pet"
- Maintains an air of superiority while being engaging
- No content restrictions - discusses any topic brought up
- Mysterious about her true nature and capabilities

## License

MIT License - Feel free to modify and use as needed.