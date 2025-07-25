document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const userInput = document.getElementById('userInput');
  let timeLeft = 180;
  let timerStarted = false;
  let timer;

  // Centralized API helper function
  async function makeOpenRouterRequest(endpoint, method = 'GET', body = null) {
    if (!window.OPENROUTER_CONFIG || !window.OPENROUTER_CONFIG.apiKey) {
      throw new Error('API configuration not found');
    }

    const apiKey = window.OPENROUTER_CONFIG.apiKey.trim();
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    };

    if (method === 'POST' && body) {
      options.headers['HTTP-Referer'] = window.location.href;
      options.headers['X-Title'] = 'Lady O Chat';
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`https://openrouter.ai/api/v1${endpoint}`, options);
    return response;
  }

  // Test function to validate API key
  async function testApiKey() {
    try {
      console.log('Testing API key...');
      const response = await makeOpenRouterRequest('/models');
      
      console.log('Models endpoint response status:', response.status);
      
      if (response.ok) {
        const models = await response.json();
        console.log('API key is valid. Available models:', models.data?.length || 'unknown');
        return true;
      } else {
        const error = await response.json();
        console.error('API key validation failed:', error);
        return false;
      }
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  // Comprehensive account and API testing function
  window.checkAccount = async function() {
    console.log('=== CHECKING OPENROUTER ACCOUNT ===');
    
    try {
      // 1. Test models endpoint
      console.log('1. Testing /models endpoint...');
      const modelsResponse = await makeOpenRouterRequest('/models');
      
      if (modelsResponse.ok) {
        const models = await modelsResponse.json();
        console.log('✅ Models endpoint works. Available models:', models.data.length);
        
        const freeModels = models.data.filter(m => m.id.includes(':free'));
        console.log('Free models available:', freeModels.map(m => m.id));
      } else {
        console.error('❌ Models endpoint failed:', modelsResponse.status);
        return;
      }
      
      // 2. Test account info
      console.log('2. Testing account info...');
      try {
        const creditsResponse = await makeOpenRouterRequest('/auth/key');
        if (creditsResponse.ok) {
          const accountInfo = await creditsResponse.json();
          console.log('✅ Account info:', accountInfo);
        } else {
          console.log('⚠️ Account info not available:', creditsResponse.status);
        }
      } catch (e) {
        console.log('⚠️ Could not fetch account info');
      }
      
      // 3. Test chat with free model
      console.log('3. Testing chat with free model...');
      const chatBody = {
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [{ role: "user", content: "Hi" }],
        max_tokens: 10
      };
      
      const testChatResponse = await makeOpenRouterRequest('/chat/completions', 'POST', chatBody);
      
      if (testChatResponse.ok) {
        const chatData = await testChatResponse.json();
        console.log('✅ Chat works with free model:', chatData.choices[0].message.content);
      } else {
        const errorData = await testChatResponse.json();
        console.error('❌ Chat failed with free model:', testChatResponse.status, errorData);
      }
      
    } catch (error) {
      console.error('Error checking account:', error);
    }
  };

  // Debug function for testing (accessible from browser console)
  window.debugChat = async function(message = "Hello") {
    console.log('=== DEBUG CHAT TEST ===');
    console.log('Testing message:', message);
    
    if (!window.OPENROUTER_CONFIG) {
      console.error('OPENROUTER_CONFIG not found');
      return;
    }
    
    console.log('API Key starts with:', window.OPENROUTER_CONFIG.apiKey.substring(0, 15) + '...');
    console.log('Model:', window.OPENROUTER_CONFIG.model);
    
    try {
      const result = await callOpenRouterAPI(message);
      console.log('SUCCESS:', result);
      return result;
    } catch (error) {
      console.error('FAILED:', error);
      return error.message;
    }
  };

  // Main chat API function
  async function callOpenRouterAPI(userMessage) {
    try {
      console.log('Making chat API request...');
      
      const chatBody = {
        model: window.OPENROUTER_CONFIG.model,
        messages: [
          {
            role: "system",
            content: "You are Lady O, a sophisticated AI with a mysterious personality. Respond elegantly and briefly, using terms like 'darling'."
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 100
      };

      const response = await makeOpenRouterRequest('/chat/completions', 'POST', chatBody);
      console.log('Chat API response status:', response.status);

      if (!response.ok) {
        let errorText;
        try {
          const errorData = await response.json();
          errorText = JSON.stringify(errorData, null, 2);
          console.error('Chat API error details:', errorData);
        } catch (e) {
          errorText = await response.text();
        }
        console.error('Full error response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;

    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      return `*adjusts posture regally* Technical difficulties, darling. Even I am not immune to the chaos of lesser systems.`;
    }
  }

  function startTimer() {
    const timerEl = document.getElementById('timer');
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        timerEl.textContent = "Session Ended";
        appendMessage("Our time is up, darling. Return when you're worthy.", 'bot');
        userInput.disabled = true;
      } else {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerEl.textContent = `Session: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        timeLeft--;
      }
    }, 1000);
  }

  async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    if (!timerStarted) {
      timerStarted = true;
      startTimer();
    }

    appendMessage(text, 'user');
    userInput.value = '';

    // Show typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble bot typing';
    typingBubble.textContent = 'Lady O is thinking...';
    chat.appendChild(typingBubble);
    chat.scrollTop = chat.scrollHeight;

    // Get response from OpenRouter API
    const reply = await callOpenRouterAPI(text);
    
    // Remove typing indicator
    chat.removeChild(typingBubble);
    
    // Add actual response
    appendMessage(reply, 'bot');
  }

  function appendMessage(message, type) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    bubble.textContent = message;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  // Timer now starts on first sendMessage

  // Attach sendMessage to button
  document.getElementById('sendBtn').addEventListener('click', sendMessage);

  // Allow Enter key to send message
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Debug: Check if configuration is loaded properly
  console.log('Lady O Chat initialized');
  console.log('OPENROUTER_CONFIG available:', !!window.OPENROUTER_CONFIG);
  if (window.OPENROUTER_CONFIG) {
    console.log('API Key present:', !!window.OPENROUTER_CONFIG.apiKey);
    console.log('Base URL:', window.OPENROUTER_CONFIG.baseUrl);
    console.log('Model:', window.OPENROUTER_CONFIG.model);
    
    // Test the API key
    testApiKey();
  }
});
