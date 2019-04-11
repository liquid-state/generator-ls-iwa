import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { DevTools, Settings } from '@project/common';
import rootReducer from './reducers';

const configureStore = (app, router, history) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      app,
      router,
      history,
    },
  });
  const store = createStore(
    combineReducers({
      ...rootReducer,
    }),
    !Settings.DEBUG
      ? compose(applyMiddleware(sagaMiddleware))
      : Settings.REDUX_INLINE
        ? compose(applyMiddleware(sagaMiddleware), DevTools.instrument())
        : composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  return {
    store,
    runSaga: sagaMiddleware.run,
  };
};

export default configureStore;
