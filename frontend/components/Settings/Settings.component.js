export function SettingsComponent() {
    const element = document.createElement('div');
    render(element);
    return {element, cleanup: () => {} };
}

async function render(element) {
   element.append('settings will be here')
   element.append(document.createElement('br'))
   element.append('key controll for player1 is arrows');
   element.append(document.createElement('br'))
   element.append('key controll for player2 is wsda');
}