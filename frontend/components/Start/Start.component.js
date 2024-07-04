import { start } from "../../../core/state-manager.js";

export function StartComponent() {
    const element = document.createElement('div');
    render(element);
    return {element, cleanup: () => {} };
}

async function render(element) {
    const button = document.createElement('button');
    button.innerHTML = 'start';
    button.addEventListener('click', () => {
        start()
    });
    element.append(button);
}