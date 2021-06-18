import { all } from "redux-saga/effects";

import authSaga from "./authSaga";
import roomSaga from "./roomSaga";

export default function* rootSaga() {
	yield all([authSaga(), roomSaga()]);
}
