// Read file content
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

// Handle file input change
document.getElementById('fileInput').addEventListener('change', async () => {
  const file = document.getElementById('fileInput').files[0];
  if (file) {
    try {
      const content = await readFile(file);
      document.getElementById('response').textContent = 'Processing...';
      chrome.runtime.sendMessage({ action: 'processFile', content });
    } catch (error) {
      document.getElementById('response').textContent = 'Error reading file: ' + error.message;
    }
  }
});

// Listen for response from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'showResponse') {
    document.getElementById('response').textContent = message.response;
  }
});
