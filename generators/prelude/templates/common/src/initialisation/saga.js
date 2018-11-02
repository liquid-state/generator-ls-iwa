import {
  takeEvery,
  getContext,
  call,
  put,
  race,
  select,
  take,
} from 'redux-saga/effects';
import apiGatewayFactory from 'aws-api-gateway-client';
import IdentityPlugin, { JWTProvider, IdentityStore } from '@liquid-state/iwa-identity';
import KeyValuePlugin from '@liquid-state/iwa-keyvalue';
import { configureCognito } from '@liquid-state/iwa-cognito-identity';
import {
  INITIALISE,
  initialisationBegun,
  initialisationComplete,
  INITIALISATION_COMPLETE,
} from './actions';
import { initialisationIsComplete, initialisationInProgress } from './reducer';

const setPermissionsForKey = key => (
  key
    .addWritePermission('iwa', 'login')
    .addWritePermission('iwa', 'registration')
    .addWritePermission('iwa', 'home')
    .addReadPermission('native', 'library')
);

const buildRefreshFunction = (app, pipId) => async () => {
  const identity = await app.use(IdentityPlugin).forService('cognito').getIdentity();
  if (!identity.isAuthenticated) {
    return { identity: null, credentials: null };
  }
  const {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    sessionToken,
  } = identity.credentials;
  const { UIS_URL, AWS_REGION } = await app.configuration('UIS_URL', 'AWS_REGION');
  const gateway = apiGatewayFactory.newClient({
    invokeUrl: UIS_URL,
    accessKey,
    secretKey,
    sessionToken,
    region: AWS_REGION,
  });
  const pathTemplate = 'user/pip/{pip_id}/';
  const params = { pip_id: pipId };
  const extraParams = { queryParams: { with_jwt: true } };
  const { data: { jwt } } = await gateway.invokeApi(params, pathTemplate, 'GET', extraParams);
  return { identity: jwt, credentials: { jwt } };
};


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
  yield call(configureCognito, app, setPermissionsForKey);

  const kv = app.use(KeyValuePlugin);
  const idManager = app.use(IdentityPlugin);

  const idStore = new IdentityStore(kv, { setPermissionsForKey });
  idManager.addProvider(
    'ubiquity',
    new JWTProvider('pip:ubiquity', idStore, buildRefreshFunction(app, 'ubiquity')),
  );
  idManager.addProvider(
    'document-search',
    new JWTProvider('pip:document-search', idStore, buildRefreshFunction(app, 'document-search')),
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
