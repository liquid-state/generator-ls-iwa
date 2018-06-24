import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const configureStore = (app, router, history) => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      app,
      router,
    },
  });
  const routerMiddleware = createRouterMiddleware(history);
  const store = createStore(
    combineReducers({
      ...rootReducer,
      router: routerReducer,
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware)),
  );

  return {
    store,
    runSaga: sagaMiddleware.run,
  };
};

export default configureStore;
