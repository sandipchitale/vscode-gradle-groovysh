import * as vscode from 'vscode';
import * as path from 'path';

let workspaceFolder: string;

let APPLY_GRADLE_GROOVYSH_DOT_GRADLE: string;

export function activate(context: vscode.ExtensionContext) {
    APPLY_GRADLE_GROOVYSH_DOT_GRADLE = path.join(context.extensionPath, 'gradle', 'groovysh-task.gradle');

    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
        workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }

    context.subscriptions.push(vscode.commands.registerCommand('vscode-gradle-groovysh.groovysh', groovysh));
}

function groovysh() {
    if (workspaceFolder) {
        const terminal = vscode.window.createTerminal({
            name: 'groovysh',
            cwd: workspaceFolder
        });
        terminal.show();
        terminal.sendText(`.${path.sep}gradlew -q --no-daemon --console=plain --init-script ${APPLY_GRADLE_GROOVYSH_DOT_GRADLE} gradle-groovysh`);
    }
}

export function deactivate() {}
