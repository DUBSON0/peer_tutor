// Function to read file content as text
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

// Handle file selection
document.getElementById('fileInput').addEventListener('change', async () => {
  const file = document.getElementById('fileInput').files[0];
  if (file) {
    try {
      console.log('File selected:', file.name);
      const content = await readFile(file);
      console.log('File content read:', content);
      const responseDiv = document.getElementById('response');
      if (responseDiv) {
        responseDiv.innerHTML = '<div class="processing">Processing...</div>';
      } else {
        console.error('Response div not found');
      }
      chrome.runtime.sendMessage({ action: 'processFile', content });
      console.log('Message sent to background with content:', content);
    } catch (error) {
      console.error('File read error:', error.message);
      document.getElementById('response').textContent = 'Error reading file: ' + error.message;
    }
  }
});

// Listen for API response and render it
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in tab:', message);
  if (message.action === 'showResponse') {
    console.log('Processing response:', message.response);
    const responseDiv = document.getElementById('response');
    if (!responseDiv) {
      console.error('Response div not found when updating');
      return;
    }
    if (typeof marked === 'undefined') {
      console.error('marked.js not loaded');
      responseDiv.textContent = 'Error: Markdown parser not available. Raw response: ' + message.response;
      return;
    }
    try {
      const html = marked.parse(message.response);
      console.log('Parsed HTML:', html);
      responseDiv.innerHTML = html;
      if (!responseDiv.innerHTML) {
        console.warn('HTML is empty after parsing, falling back to raw text');
        responseDiv.textContent = message.response;
      }
    } catch (error) {
      console.error('Error parsing Markdown:', error.message);
      responseDiv.textContent = 'Error parsing response: ' + message.response;
    }
  }
});

// Log to confirm script initialization
console.log('Tab.js loaded and message listener registered');
