import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// import {createLogger} from 'redux-logger';控制台输出redux的日志，如果需要，把这几个注释都放开，并npm i -S redux-logger
import rootReducer from '../reducers/index';
import sagas from '../saga/index';
import { composeWithDevTools } from 'redux-devtools-extension';
// const logger = createLogger({ collapsed: true });
const sagaMiddleware = createSagaMiddleware();
export default (initialState=>{
    const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(
        thunk,
        // logger,
        sagaMiddleware
    )));
    if (module.hot) {
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    sagaMiddleware.run(sagas);
    return store;
})();
