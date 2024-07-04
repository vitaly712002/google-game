import { GAME_STATUSES } from '../../core/constants.js';
import { getGameStatus, subscribe } from '../../core/state-manager.js';
import { AudioComponent } from './Audio/Audio.component.js';
import { GridComponent } from './Grid/Grid.component.js';
import { LoseCompoent } from './Lose/Lose.component.js';
import { ResultComponent } from './ResultPanel/ResultPanel.component.js';
import { SettingsComponent } from './Settings/Settings.component.js';
import { StartComponent } from './Start/Start.component.js';
import { WinComponent } from './Win/Win.component.js';

export function AppComponent() {
  const localState = {
    prevGameStatus: null,
    cleanupFunctions: [],
  };

  const element = document.createElement('div');

  const audioComponent = AudioComponent();
  
  subscribe(() => {
    render(element, localState);
  })
  render(element, localState);
  return { element, cleanup: () => {}  };
}

async function render(element, localState) {
    const gameStatus = await getGameStatus();

  if(localState.prevGameStatus === gameStatus) return;
  localState.prevGameStatus = gameStatus;
  element.innerHTML = '';

  localState.cleanupFunctions.forEach(cf => cf());
  localState.cleanupFunctions = [];
  
  switch (gameStatus) {
    case GAME_STATUSES.SETTINGS: {
      const settingsComponent = SettingsComponent();
      localState.cleanupFunctions.push(settingsComponent.cleanup);
      const startComponent = StartComponent();
      localState.cleanupFunctions.push(startComponent.cleanup);
      await element.append(settingsComponent.element, startComponent.element);
      break;
    }
    case GAME_STATUSES.IN_PROGRESS: {
      const settingsComponent = SettingsComponent();
      localState.cleanupFunctions.push(settingsComponent.cleanup);
      const resultComponent = ResultComponent();
      localState.cleanupFunctions.push(resultComponent.cleanup);
      const gridComponent = GridComponent();
      localState.cleanupFunctions.push(gridComponent.cleanup);
      await element.append(
        settingsComponent.element,
        resultComponent.element,
        gridComponent.element,
      );
      break;
    }
    case GAME_STATUSES.LOSE: {
      const loseCompoent = LoseCompoent();
      localState.cleanupFunctions.push(loseCompoent.cleanup);
      await element.append(loseCompoent.element);
      break;
    }

    case GAME_STATUSES.WIN: {
      const winComponent = WinComponent();
      localState.cleanupFunctions.push(winComponent.cleanup);
      await element.append(winComponent.element);
      break;
    }

    default:
      throw new Error('Invalid game status');
  }
}
