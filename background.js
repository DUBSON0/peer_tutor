// Open a new tab when the extension icon is clicked
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('tab.html') });
});

// Process messages from the tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'processFile') {
    const API_URL = 'https://api.x.ai/v1/chat/completions';
    const API_KEY = 'your-api-key'; // Replace with your actual API key

    const requestBody = {
      messages: [
        { role: 'system', content: 'You are a test assistant.' },
        { role: 'user', content: message.content }
      ],
      model: 'grok-2-latest',
      stream: false,
      temperature: 0
    };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const grokReply = data.choices[0].message.content;
        chrome.tabs.sendMessage(sender.tab.id, { action: 'showResponse', response: grokReply });
      })
      .catch(error => {
        chrome.tabs.sendMessage(sender.tab.id, { action: 'showResponse', response: 'Error: ' + error.message });
      });
  }
});
