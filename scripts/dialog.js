function loadDefaultAlertEvent() {
    const alertButton = document.getElementById('default-alert-button');
    alertButton.addEventListener('click', () => window.alert('Alert pressed!'));
}

function loadDefaultConfirmEvent() {
    const confirmButton = document.getElementById('default-confirm-button');
    confirmButton.addEventListener('click', () => {
        let value = window.confirm('Do you confirm this?');
        document.getElementById('output').textContent = `The value returned by the confirm method is : ${value}`;
    });
}

function loadDefaultPromptEvent() {
    const promptButton = document.getElementById('default-prompt-button');
    promptButton.addEventListener('click', () => {
        let dirtyInput = window.prompt('What is your name?', '<b onMouseOver="alert(\'pwned\')">Roll me</b>');
        if (!dirtyInput) {
            dirtyInput = 'User didn\'t enter anything';
        }
        document.getElementById('output').innerHTML = `The value returned by the prompt method is : ${dirtyInput}`;
    });
}

function loadDefaultSaferPromptEvent() {
    const saferPromptButton = document.getElementById('default-safer-prompt-button');
    saferPromptButton.addEventListener('click', () => {
        let dirtyInput = window.prompt('What is your name?', '<b onMouseOver="alert(\'pwned\')">Roll me</b>');
        if (!dirtyInput) {
            dirtyInput = 'User didn\'t enter anything';
        } else {
            dirtyInput = DOMPurify.sanitize(dirtyInput);
        }
        document.getElementById('output').innerHTML = `The value returned by the safer prompt method is : ${dirtyInput}`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadDefaultAlertEvent();
    loadDefaultConfirmEvent();
    loadDefaultPromptEvent();
    loadDefaultSaferPromptEvent();
});