import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import { logger } from 'redux-logger'
import rootSaga from './sagas'
import { createBrowserHistory } from 'history'
const history = createBrowserHistory();
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware(rootSaga)
let middleware = composeEnhancers(applyMiddleware(logger, sagaMiddleware));
//let middleware = applyMiddleware(sagaMiddleware);
const store = createStore(reducers(history), middleware)

sagaMiddleware.run(rootSaga)

export default store
export { history }
