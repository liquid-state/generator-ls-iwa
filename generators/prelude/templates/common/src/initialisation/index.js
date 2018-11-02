/** Gets an iwa into a known good state from launch.
 *
 * This should ideally be dispatched from index of each IWA.
*/
import { Messages } from '@liquid-state/iwa-core';

export {
  INITIALISE,
  INITIALISATION_BEGUN,
  INITIALISATION_COMPLETE,
  initialise,
  initialisationBegun,
  initialisationComplete,
} from './actions';
export {
  default as reducer,
  initialisationIsComplete,
  initialisationInProgress,
} from './reducer';
export {
  default as saga,
  waitForInitialisation,
} from './saga';

export const sendSetReadyAndWait = (app) => {
  app.communicator.send(Messages.iwa.setReady());
  return new Promise((resolve) => {
    app.communicator.messageReceived.on(resolve);
  });
};
