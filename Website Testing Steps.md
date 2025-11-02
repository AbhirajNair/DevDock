# ⚡ DevDock+ • Website Testing Guide  
---

## ⚙️ Step 1: Setup & Launch  

**Objective:** Install dependencies, run the development server, and verify the app runs correctly.  

1. Open the terminal in your **project directory**.  
2. Run the following commands to install and start the app:  

   ```bash
   # Step 1: Install all required dependencies
   npm install  

   # Step 2: Start the development server
   npm run dev  

   # Step 3: After build completes, Vite will show something like:
   #   ➜  Local: http://localhost:5173/
   #   ➜  Network: use --host to expose
   # Open this link in your browser.

---

## 🧮 Step 2: Testing the JSON Formatter  

**Objective:** Verify formatting, minifying, JSON↔YAML conversion, error handling, and data persistence.  

1. Click on the **“JSON Formatter”** tab in the navigation bar.  
2. Paste messy JSON code into the input area and click **Format**.  
   - ✅ The JSON should be neatly indented and easy to read.  
3. Click **Minify** and confirm it compresses the JSON into a single line.  
4. Use the **Convert to YAML** button, then convert back to **JSON** to verify bidirectional conversion.  
5. Paste invalid JSON (for example, missing a quotation mark) and check if an **error message** appears.  
6. Refresh the page.  
   - 🔁 Confirm that the previous input and output still appear — showing **data persistence** via localStorage.  

**Example Input:**  

```json
{"name": "DevDock", "version": "1.0", "offline": true}
```

**Expected Output:**
```json
{
  "name": "DevDock",
  "version": "1.0",
  "offline": true
}
```

---

## 📝 Step 3: Testing the Markdown Previewer  

**Objective:** Ensure live rendering, copying, export, and data persistence.  

1. Click on the **“Markdown Previewer”** tab from the navigation bar.  
2. In the editor pane, enter the following Markdown text:  

```markdown
# DevDock+
_Developer toolkit for everyday use._
```
3. Check that the **preview pane updates instantly** as you type.  
4. Use the **“Export .md”** option to download your Markdown file.  
5. Verify that the file downloads correctly and contains your input text.  
6. Click on **“Copy Markdown”** and paste it into a text editor to ensure it copied properly.  
7. Refresh the page — your Markdown content should **remain saved** (verifying localStorage persistence).  

---

## 🧠 Step 4: Testing the Commit Message Generator

**Objective:** Verify message generation, copy functionality, and data persistence.

1. Open the **“Commit Message Generator”** tab.  
2. Choose a commit type like **“feat”** or **“fix.”**  
3. Add a scope and description, for example:  

```
Type: feat
Scope: json-formatter
Description: add YAML conversion feature
```

4. Click **“Copy Subject”** or **“Copy Full”** to copy the generated message.  
5. Paste it into a text editor to verify that it copies correctly.  
6. Refresh the page and confirm that the last form inputs are saved (verifying **data persistence**).  

---

## 🧩 Step 5: Testing the Snippet Saver  

**Objective:** Verify creation, search, deletion, export/import, and data persistence of saved snippets.  
 

1. Go to the **“Snippet Saver”** tab.  
2. Add a new snippet with **title**, **code**, and **tags**.  
3. Confirm that it appears in the list below.  
4. Add a few more snippets to test multiple entries.  
5. Use the **search bar** to find snippets by title or tag.  
6. Try deleting a snippet and ensure it disappears.  
7. **Export** snippets to a JSON file, **Clear All**, and then **Re-import** to test backup and restore.  
8. Refresh the page to confirm that snippets persist in **localStorage**.  

```json
{
  "title": "Sample Snippet",
  "code": "console.log('Hello, DevDock!');",
  "tags": ["javascript", "test"]
}
```
✅ **Verification:**  
- Snippets should remain saved even after refreshing the page.  
- Imported snippets should restore exactly as before export.  

---

## 🧮 Step 6: Testing the JSON Diff Tool  

**🎯 Objective:**  
Validate the functionality of comparing, swapping, clearing, and persisting JSON data between two input fields.  

6.1 Open the **“JSON Diff”** tab.  
6.2 Paste JSON data in both input boxes — **A** and **B**.  

**Example Input:**  
```
A → {"name":"DevDock","version":"1.0","offline":false}
B → {"name":"DevDock+","version":"1.1","offline":true}
```
6.3 Click **“Compare”** — differences should be highlighted.  
6.4 Use **“Swap”** to interchange A and B.  
6.5 Click **“Clear”** to reset both fields.  
6.6 Refresh the page — both JSON inputs should persist, confirming data retention.  

✅ **Verification:**  
- Differences are visually highlighted.  
- Swapping and clearing work correctly.  
- JSON data remains saved after refresh.  
---
## 🧩 Step 7: Testing the Settings Panel  

7.1 Click on the **Settings** icon (⚙️).  
7.2 Toggle between **Light** and **Dark** themes to confirm theme switching works.  
7.3 Refresh and ensure the selected theme is remembered.  
7.4 Click **“Backup Data”** to download the data file.  
7.5 Click **“Clear All Data”** and confirm everything resets.  
7.6 Use **“Restore Data”** to import the backup and restore all tool data.  

✅ **Verification:**  
- Theme switching updates instantly.  
- Theme preference persists after refresh.  
- Backup, reset, and restore all function correctly.

---
## 📱 Step 8: Testing Offline and PWA Functionality  

8.1 Install the app using the **“Install DevDock+”** option in your browser.  
8.2 Turn off your internet connection or switch to **Offline Mode** in browser DevTools.  
8.3 Open the installed **DevDock+** app and confirm that all tools continue to function offline.  
8.4 Add or modify data while offline, then reconnect to the internet and verify that all changes persist correctly.  

✅ **Verification:**  
- App installs successfully as a PWA.  
- All tools work seamlessly in offline mode.  
- Data added or modified offline syncs properly once reconnected.  

