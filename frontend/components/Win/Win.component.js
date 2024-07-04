import { playAgain } from "../../../core/state-manager.js";

export function WinComponent() {
    const element = document.createElement('div');
    render(element);
    return { element, cleanup: () => {} };
}

async function render(element) {
    element.innerHTML = 'YOU WIN';
    const button = document.createElement('button');
    button.innerHTML = 'start again';
    button.addEventListener('click', () => {
        playAgain()
    });
    element.append(button);
}