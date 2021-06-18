import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
const initialState = {};

const store = createStore(
	rootReducer,
	initialState,
	compose(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
