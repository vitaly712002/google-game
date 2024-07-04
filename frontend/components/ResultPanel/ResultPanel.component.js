import { EVENTS } from '../../../core/constants.js';
import {getPlayerPoints, getGooglePoints, subscribe, unsubscribe} from '../../../core/state-manager.js';

export function ResultComponent() {
    const element = document.createElement('div');
    const observer = (e) => {
        if(e.name !== EVENTS.SCORES_CHANGED) return;
        
        render(element);
    }; 
    subscribe(observer);

    render(element);

    return {element, cleanup: () => unsubscribe(observer) };
}

async function render(element) {
    element.innerHTML = '';
    element.classList.add('result-panel');
    const playerOnePoints =  await getPlayerPoints(1);
    const playerTwoPoints = await getPlayerPoints(2);
    const googlePoints = await getGooglePoints();
    element
        .append(`Player1: ${playerOnePoints}, Player2: ${playerTwoPoints}, Google: ${googlePoints}`);
}