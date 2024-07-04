import { playAgain } from "../../../core/state-manager.js";

export function LoseCompoent() {
    const element = document.createElement('div');
    render(element);
    return { element, cleanup: () => {} };
}


function render(element) {
    element.innerHTML = 'YOU LOSE';
    const button = document.createElement('button');
    button.innerHTML = 'start again';
    button.addEventListener('click', () => {
        playAgain()
    });
    element.append(button);
}