"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const groq_sdk_1 = require("groq-sdk");
// Initialize Groq client with the API key
let groq;
const SECRETS_STORE_KEY = "groqcloud-api-key";
const GROQCLOUD_MODEL = "llama3-8b-8192";
class ChatMessage {
    constructor() {
        this.role = "";
        this.content = "";
    }
}
class GroqCloudRequest {
    constructor() {
        this.model = GROQCLOUD_MODEL;
        this.messages = [];
        this.temperature = 0.7;
    }
}
async function activate(context) {
    let apiKey = await context.secrets.get(SECRETS_STORE_KEY);
    if (!apiKey) {
        apiKey = await vscode.window.showInputBox({ prompt: "Enter your API Key" });
        if (apiKey) {
            await context.secrets.store(SECRETS_STORE_KEY, apiKey);
        }
        else {
            vscode.window.showErrorMessage("API Key is required to use this extension.");
            return;
        }
    }
    groq = new groq_sdk_1.default({ apiKey });
    addMenuCommand(context, "askdoubt.answerit", () => {
        executeWithProgress(() => answerit(context));
    });
    addMenuCommand(context, "askdoubt.changeapikey", async () => {
        const newApiKey = await vscode.window.showInputBox({ prompt: "Enter API Key" });
        if (newApiKey) {
            await context.secrets.store(SECRETS_STORE_KEY, newApiKey);
            groq = new groq_sdk_1.default({ apiKey: newApiKey });
            vscode.window.showInformationMessage("API Key inserted successfully.");
        }
    });
}
exports.activate = activate;
function executeWithProgress(callback) {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Please wait for few seconds...",
        cancellable: true
    }, async (progress, token) => {
        progress.report({ increment: 0 });
        await callback();
        progress.report({ increment: 100 });
    });
}
function addMenuCommand(context, command, callback) {
    let disposable = vscode.commands.registerCommand(command, callback);
    context.subscriptions.push(disposable);
}
async function answerit(context) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const selection = editor.selection;
        const selText = editor.document.getText(selection);
        const req = new GroqCloudRequest();
        req.messages.push({ role: "user", content: selText });
        const answer = await askGroqCloud(context, req);
        if (answer) {
            const position = editor.selection.end.translate(1, 0);
            // Insert below selected text
            editor.edit(editBuilder => {
                editBuilder.insert(position, "\n\nAI: " + answer + "\n");
            });
        }
    }
}
async function askGroqCloud(context, req) {
    try {
        const response = await groq.chat.completions.create(req);
        return response.choices[0]?.message?.content;
    }
    catch (error) {
        // Explicitly type the error
        const err = error;
        vscode.window.showErrorMessage(`Error: ${err.message}`);
        return undefined;
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map