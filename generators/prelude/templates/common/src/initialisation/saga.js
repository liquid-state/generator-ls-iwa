import {
  takeEvery,
  getContext,
  call,
  put,
  race,
  select,
  take,
} from 'redux-saga/effects';
import IdentityPlugin, { JWTProvider, IdentityStore } from '@liquid-state/iwa-identity';
import KeyValuePlugin from '@liquid-state/iwa-keyvalue';
import { configureCognito } from '@liquid-state/iwa-cognito-identity';
import {
  INITIALISE,
  initialisationBegun,
  initialisationComplete,
  INITIALISATION_COMPLETE,
} from './actions';
import UISClient from '../uis';
import { initialisationIsComplete, initialisationInProgress } from './reducer';

// Add each of your IWAs here so that they can access credentials.
const setPermissionsForKey = key => (
  key
    .addWritePermission('iwa', 'entry')
    .addWritePermission('iwa', 'home')
    .addReadPermission('native', 'library')
);

const buildRefreshFunction = (() => {
  // Cache is actually a promise which will resolve to the result of getTokens
  let cache = null;
  let lastRefresh = null;
  return (uisClient, pipId) => async () => {
    if (!lastRefresh || lastRefresh < Date.now() - 3600) {
      lastRefresh = Date.now();
      cache = uisClient.getTokens();
    }
    const { data: { [pipId]: jwt } } = await cache;
    return { identity: jwt, credentials: { jwt } };
  };
})();


export default () => takeEvery(INITIALISE, initialise);

function* initialise() {
  const { complete, inProgress } = yield select(({ initialisation }) => ({
    complete: initialisationIsComplete(initialisation),
    inProgress: initialisationInProgress(initialisation),
  }));
  if (complete) {
    // eslint-disable-next-line no-console
    console.error('Initialise called when initialisation is already complete!');
    return;
  } if (inProgress) {
    // eslint-disable-next-line no-console
    console.error('Initialise called when initialisation was already in progress!');
    return;
  }
  yield put(initialisationBegun());

  const app = yield getContext('app');
  try {
    yield call(configureCognito, app, setPermissionsForKey);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      'Congito is not configured correctly, likely you are missing values from settings or your app config.',
      e,
    );
    yield put(initialisationComplete());
    return;
  }


  const kv = app.use(KeyValuePlugin);
  const idManager = app.use(IdentityPlugin);

  const idStore = new IdentityStore(kv, { setPermissionsForKey });
  const client = UISClient(app);
  idManager.addProvider(
    'ubiquity',
    new JWTProvider('pip:ubiquity', idStore, buildRefreshFunction(client, 'ubiquity')),
  );
  idManager.addProvider(
    'document-search',
    new JWTProvider('pip:document-search', idStore, buildRefreshFunction(client, 'document-search')),
  );
  yield put(initialisationComplete());
}

export function* waitForInitialisation() {
  const { isComplete, didComplete } = yield race({
    isComplete: select(({ initialisation }) => initialisationIsComplete(initialisation)),
    didComplete: take(INITIALISATION_COMPLETE),
  });
  if (isComplete || didComplete) {
    return;
  }
  yield take(INITIALISATION_COMPLETE);
}
