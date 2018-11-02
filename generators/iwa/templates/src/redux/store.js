import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
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
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  return {
    store,
    runSaga: sagaMiddleware.run,
  };
};

export default configureStore;
