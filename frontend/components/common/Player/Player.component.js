export function PlayerComponent(playerNumber) {
    const element = document.createElement('img');
    render(element, playerNumber);
    return {element, cleanup: () => {} };
}

async function render(element, playerNumber) {
    element.src = `assets/images/player${playerNumber}.png`;
}
