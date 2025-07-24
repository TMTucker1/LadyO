document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const userInput = document.getElementById('userInput');
  let timeLeft = 180;

  const botReplies = [
    "Tread carefully with your words.",
    "You amuse me... for now.",
    "Is that truly all you have to offer?",
    "My patience is limited, unlike your desire."
  ];

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    setTimeout(() => {
      const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
      appendMessage(reply, 'bot');
    }, 1000);
  }

  function appendMessage(message, type) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    bubble.textContent = message;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  // Countdown Timer
  const timerEl = document.getElementById('timer');
  const timer = setInterval(() => {
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

  // Attach sendMessage to button
  document.getElementById('sendBtn').addEventListener('click', sendMessage);

  // Allow Enter key to send message
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
