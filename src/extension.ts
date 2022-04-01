import * as vscode from 'vscode';

export const activate = () => {
    const ddogViewer = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right
    );

    ddogViewer.text = '$DDOG';
    ddogViewer.color = 'tomato';

    ddogViewer.show();
};
