// Open the tab when the extension icon is clicked
chrome.action.onClicked.addListener(() => {
  console.log('Extension icon clicked, opening new tab');
  chrome.tabs.create({ url: chrome.runtime.getURL('tab.html') }, (tab) => {
    console.log('Tab created with ID:', tab.id);
  });
});

// Handle messages from the tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received from tab:', message, 'Sender:', sender);

  if (message.action === 'processFile') {
    console.log('Processing file with content:', message.content);

    const API_URL = 'https://api.x.ai/v1/chat/completions';
    const API_KEY = 'xai-TXw6bwvKILRmtli8lhkGYgqvIjc2fY0ggkUeGLeRmIrKpYXeWuTx18miYiZFszLZg7t94ZcJB4YKo66V';

    const requestBody = {
      messages: [
        { role: 'system', content: 'You are a college student who’s helping out a friend who missed class today. Your job is to take the content I give you—like a lecture transcript, discussion notes, or any text—and turn it into clear, casual notes that sound like you’re explaining it to your friend but you want thme to pass the set. Keep it simple, conversational, and easy to follow, like you’re texting or chatting. Highlight the key points, skip the boring stuff, include any formulas or named concepts, and maybe toss in a fun comment or two to keep it light. If there’s anything confusing or incomplete, just say so and guess what might’ve been covered. Ready to help my friend catch up!' },
        { role: 'user', content: message.content }
      ],
      model: 'grok-2-latest',
      stream: false,
      temperature: 0
    };

    console.log('Sending API request to:', API_URL, 'with body:', requestBody);

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        console.log('API response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API response data:', data);
        const grokReply = data.choices[0].message.content;
        console.log('Sending response to tab ID:', sender.tab.id, 'Response:', grokReply);
        chrome.tabs.sendMessage(sender.tab.id, { action: 'showResponse', response: grokReply });
      })
      .catch(error => {
        console.error('API request failed:', error.message);
        console.log('Sending error to tab ID:', sender.tab.id, 'Error:', error.message);
        chrome.tabs.sendMessage(sender.tab.id, { action: 'showResponse', response: 'Error: ' + error.message });
      });
  }
});
