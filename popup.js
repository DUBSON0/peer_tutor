// Function to read file content
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

// Function to check for response
function checkForResponse() {
  chrome.storage.local.get('apiResponse', (result) => {
    if (result.apiResponse) {
      document.getElementById('response').textContent = result.apiResponse;
      chrome.storage.local.remove('apiResponse');
      chrome.action.setBadgeText({ text: '' }); // Clear badge
    } else {
      document.getElementById('response').textContent = 'No response yet. Select a file to start.';
    }
  });
}

// Handle file upload
document.getElementById('fileInput').addEventListener('change', async function() {
  const file = this.files[0];
  if (file) {
    try {
      const userContent = await readFile(file);
      chrome.storage.local.set({ userContent }, () => {
        chrome.runtime.sendMessage({ action: 'callGrokAPI' });
        document.getElementById('response').textContent = 'Processing...';
      });
    } catch (error) {
      document.getElementById('response').textContent = 'Error reading file: ' + error.message;
    }
    this.value = ''; // Clear the file input
  }
});

// Check for response when popup opens
checkForResponse();
