# ASKDOUBT- VSCode Extension for Copilot

This VSCode extension allows you to make calls to Groqcloud for information on selected text in the editor. It adds GPT-related query options to the right-click menu. You will need to enter and securely store a Groqcloud API key.

## Installation

Install from VSCode Extensions panel 
  Go to "Settings > Extensions > AskDoubt"


### Using The Extension

To use this extension, you will need an API key from GroqCloud. Follow the steps below to obtain and use your key:

#### 1) Obtain an API Key:

* [Visit the GroqCloud website](https://console.groq.com/docs/quickstart).
* If you don’t have an account, create one or sign up using your Google account.
* Once logged in, click the "Create New Secret Key" button.
* Copy the generated API key.

#### 2) Configure the Extension in VS Code:

* Open Visual Studio Code.
* Press `Ctrl+Shift+P` to open the command palette.
* Type `API Key` in the search bar of the command palette.
* Paste your Groq API key in the provided field and press `Enter`.

#### 3) Using the Extension:

* Enter a query in the text editor.
* Select the query text, right-click, and choose `AnswerIt` from the context menu.
* The extension will retrieve the answer and insert it directly below the selected text in your editor.



## Development Tips

To run use "Menu -> Run -> Start Debugging". This opens up a separate VSCode window to test the extension in.



