# Peer Tutor Chrome Extension

![Peer Tutor Icon](icon16.png)

**Peer Tutor** is a Chrome extension that helps students catch up on missed classes by converting lecture transcripts (e.g., from Echo360) into clear, casual notes. It uses the xAI API to process uploaded `.txt` files and delivers summaries in a conversational style, as if a friend were explaining the material.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [How to Install](#how-to-install)
  - [Step 1: Download the Files](#step-1-download-the-files)
  - [Step 2: Set Up the Folder](#step-2-set-up-the-folder)
  - [Step 3: Load the Extension in Chrome](#step-3-load-the-extension-in-chrome)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Transcript Summarization**: Upload a `.txt` lecture transcript and get concise, friendly notes.
- **Markdown Rendering**: Notes are formatted in Markdown and displayed cleanly in the extension tab.
- **Simple Interface**: Click the extension icon, upload a file, and view the results.

## Prerequisites
- **Google Chrome**: Version 88 or later (Manifest V3 support required).
- **Node.js**: Optional, for development or testing dependencies (e.g., `marked.js`).
- **Internet Connection**: Required to query the xAI API.

## How to Install

### Step 1: Download the Files
1. **Clone or Download the Repository**:
   - If you have Git installed:
       ```bash
       git clone https://github.com/DUBSON0/peer_tutor.git
       ```
   - Alternatively, download the ZIP file from the GitHub repository page (`https://github.com/DUBSON0/peer_tutor`) and extract it to a folder.

       2. **Ensure All Files Are Present**:
       You’ll need the following files in your folder:
   - `background.js`
   - `manifest.json`
   - `tab.html`
   - `tab.js`
   - `styles.css`
   - `marked.min.js` (download from [marked.js releases](https://github.com/markedjs/marked/releases) if not included)
   - `icon16.png` (ensure you have this icon file; it’s referenced in the manifest)

### Step 2: Set Up the Folder
1. Place all the files in a single directory, e.g., `peer_tutor`.
2. If `marked.min.js` isn’t included, download the latest minified version from [marked.js](https://github.com/markedjs/marked/releases) and add it to the folder.
3. Verify the folder structure matches the [File Structure](#file-structure) section below.

### Step 3: Load the Extension in Chrome
1. **Open Chrome**:
Launch Google Chrome on your computer.

2. **Access Extensions**:
   - Go to `chrome://extensions/` in the address bar.

       3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner.

       4. **Load the Extension**:
   - Click "Load unpacked" and select the `peer_tutor` folder containing all the files.
   - The "Peer Tutor" extension should appear in your extensions list with the icon from `icon16.png`.

       5. **Pin the Extension (Optional)**:
   - Click the puzzle piece icon in Chrome’s toolbar, find "Peer Tutor," and pin it for easy access.

## Usage
1. **Obtain a Transcript**:
   - Go to your lecture platform (e.g., Echo360), find the transcript option (often a text icon), and download it as a `.txt` file.

       2. **Open the Extension**:
   - Click the "Peer Tutor" icon in your Chrome toolbar to open the tab.

       3. **Upload the Transcript**:
   - Click "Upload Transcript," select your `.txt` file, and wait for processing.

       4. **View Notes**:
   - The extension will display casual, summarized notes generated by the xAI API, styled with Markdown.

## File Structure
```
peer_tutor/
├── background.js      # Background script for API calls and tab management
├── manifest.json      # Extension manifest file
├── tab.html           # HTML for the extension’s UI
├── tab.js             # Frontend logic for file handling and response display
├── styles.css         # CSS for styling the UI
├── marked.min.js      # Markdown parser library
└── icon16.png         # Extension icon (16x16 pixels)
```

## Troubleshooting
- **Extension Not Loading**:
  - Ensure all files are in the correct folder and `manifest.json` references them properly.
  - Check Chrome’s developer console (`chrome://extensions/`, click "Inspect views" > "background page") for errors.

- **"marked.js not loaded" Error**:
  - Verify `marked.min.js` is in the folder and listed in `web_accessible_resources` in `manifest.json`.

- **API Errors**:
  - The API key in `background.js` may be expired or invalid. Contact the repository owner for an updated key if needed.

- **Blank Response**:
  - Ensure your `.txt` file has content and your internet connection is active.

## Contributing
1. Fork the repository.
2. Make changes in your local copy.
3. Test the extension by loading it unpacked in Chrome.
4. Submit a pull request with a clear description of your changes.

For bugs or feature requests, open an issue on the [GitHub repository](https://github.com/DUBSON0/peer_tutor/issues).

## License
This project is unlicensed as no explicit license is provided. Contact the repository owner (DUBSON0) for usage permissions.

---

### Notes:
- **Icon**: I assumed `icon16.png` exists since it’s referenced in `manifest.json`. If you don’t have it, you’ll need to create or source a 16x16 pixel icon and update the README accordingly.
- **API Key**: The `background.js` file contains an API key (`xai-TXw6...`). For security, this should ideally be obfuscated or managed externally, but I’ve left it as-is per your input. In a real-world scenario, warn users not to share it publicly.
- **Marked.js**: The README instructs users to download `marked.min.js` if it’s not in the repo, as it’s a dependency listed in `package-lock.json` and used in `tab.js`.

    Let me know if you want to tweak this further or add specific details about the repo’s functionality!
