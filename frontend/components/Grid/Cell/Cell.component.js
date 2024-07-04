import { EVENTS } from "../../../../core/constants.js";
import { getGooglePosition, getPlayerPosition, subscribe, unsubscribe } from "../../../../core/state-manager.js";
import { GoogleComponent } from "../../common/Google/Google.component.js";
import { PlayerComponent } from "../../common/Player/Player.component.js";

export function CellCompoent(x, y) {
    const element = document.createElement('td');

    const localState = {
        renderVersion: false,
    }

    const observer = (e) => {
        if([
            EVENTS.GOOGLE_JUMPED,
            EVENTS.PLAYER1_MOVED, 
            EVENTS.PLAYER2_MOVED
        ].every(name => name !== e.name)) return;

        const oldPosition = e.payload.oldPosition;
        const newPosition = e.payload.newPosition;
        if(oldPosition.x === x && oldPosition.y === y) {
            render(element, x, y, localState);
        }
        if(newPosition.x === x && newPosition.y === y) {
            render(element, x, y, localState);
        }
    };

    subscribe(observer);
    render(element, x, y, localState);
    return {element, cleanup: () => {unsubscribe(observer)} };
}

async function render(element, x, y, localState) {
    localState.renderVersion++;
    const currentRenderVersion = localState.renderVersion;

    element.innerHTML = ''
    const googlePosition = await getGooglePosition();
    const player1Position = await getPlayerPosition(1);
    const player2Position = await getPlayerPosition(2);

    if(currentRenderVersion < localState.renderVersion) return;

    if(x === googlePosition.x && y === googlePosition.y) {
        element.append(GoogleComponent().element);
    }

    if(x === player1Position.x && y === player1Position.y) {
        element.append(PlayerComponent(1).element);
    }

    if(x === player2Position.x && y === player2Position.y) {
        element.append(PlayerComponent(2).element);
    }
}
