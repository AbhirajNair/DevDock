DevDock+ – Website Testing Steps

Step 1: Launching the Application
1.1 Open the terminal in the project directory.
1.2 Run the command npm run dev to start the development server.
1.3 Open the localhost link shown in the terminal.
1.4 Confirm that the DevDock+ homepage loads with the title and navigation bar containing all tools.

Step 2: Testing the JSON Formatter
2.1 Click on the “JSON Formatter” tab.
2.2 Paste messy JSON code and click on “Format.”
2.3 Verify that the JSON is neatly indented and easy to read.
2.4 Click “Minify” and check if it compresses the JSON into a single line.
2.5 Try converting the JSON to YAML and then back to JSON.
2.6 Paste invalid JSON (for example, missing a quote) and check if an error message is displayed.
2.7 Refresh the page — confirm that the previous input and output are still there, showing data persistence.

Step 3: Testing the Markdown Previewer
3.1 Select the “Markdown Previewer” tab.
3.2 Type Markdown text such as:
# DevDock+
_Developer toolkit for everyday use._
3.3 Observe that the live preview updates instantly on the right.
3.4 Use the “Export .md” option to download the file.
3.5 Try the “Copy Markdown” button to copy the text.
3.6 Refresh the page and check if your text remains saved.

Step 4: Testing the Commit Message Generator
4.1 Open the “Commit Message Generator” tab.
4.2 Choose a commit type like “feat” or “fix.”
4.3 Add a scope and description, for example:

	Type: feat
	Scope: json-formatter
	Description: add YAML conversion feature

4.4 Click “Copy Subject” or “Copy Full” to copy the generated message.
4.5 Paste it into a text editor to verify.
4.6 Refresh the page and confirm that the last form inputs are saved.

Step 5: Testing the Snippet Saver
5.1 Go to the “Snippet Saver” tab.
5.2 Add a new snippet with title, code, and tags.
5.3 Confirm that it appears in the list below.
5.4 Add a few more snippets to test multiple entries.
5.5 Use the search bar to find snippets by title or tag.
5.6 Try deleting a snippet and ensure it disappears.
5.7 Export snippets to a JSON file, clear all, and then re-import to test backup and restore.
5.8 Refresh to confirm that snippets persist in localStorage.

Step 6: Testing the JSON Diff Tool
6.1 Open the “JSON Diff” tab.
6.2 Paste JSON data in both input boxes — A and B.
Example:
A → {"name":"DevDock","version":"1.0","offline":false}
B → {"name":"DevDock+","version":"1.1","offline":true}
6.3 Click “Compare” and check for highlighted differences.
6.4 Use “Swap” to interchange A and B, and “Clear” to reset both fields.
6.5 Refresh and verify that both JSON inputs are still stored.

Step 7: Testing the Settings Panel
7.1 Click on the settings icon (⚙️).
7.2 Toggle between light and dark themes to confirm theme switching works.
7.3 Refresh and ensure the selected theme is remembered.
7.4 Click “Backup Data” to download the data file.
7.5 Click “Clear All Data” and confirm everything resets.
7.6 Use “Restore Data” to import the backup and restore all tool data.

Step 8: Testing Offline and PWA Functionality
8.1 Install the app using the “Install DevDock+” option in the browser.
8.2 Turn off your internet connection or switch to “Offline” mode in browser DevTools.
8.3 Open the installed DevDock+ app and confirm all tools still work offline.
8.4 Add or modify data while offline, then reconnect and ensure everything persists correctly.