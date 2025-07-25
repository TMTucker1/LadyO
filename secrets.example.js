// Sample secrets configuration
// Copy this file to secrets.js and add your actual API key

// OpenRouter API Configuration
// Get your API key from https://openrouter.ai/keys
const OPENROUTER_API_KEY = 'your-openrouter-api-key-here';

// Available models (you can change the model in the configuration below):
// Free models:
// - meta-llama/llama-3.1-8b-instruct:free
// - microsoft/phi-3-mini-128k-instruct:free
// - google/gemma-2-9b-it:free
// 
// Paid models (better quality):
// - anthropic/claude-3.5-sonnet
// - openai/gpt-4o
// - openai/gpt-3.5-turbo
// - meta-llama/llama-3.1-70b-instruct

// Export for use in other files
window.OPENROUTER_CONFIG = {
  apiKey: OPENROUTER_API_KEY,
  baseUrl: 'https://openrouter.ai/api/v1',
  model: 'meta-llama/llama-3.1-8b-instruct:free', // Free model, you can change this
  siteName: 'Lady O Chat',
  siteUrl: 'http://localhost:8000'
};
