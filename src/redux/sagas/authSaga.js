import { takeEvery, put, call } from "redux-saga/effects";

import { auth } from "./../../firebaseInit";
import { LOGIN_USER, SIGNUP_USER, LOGOUT_USER } from "./../actions/types";
import {
	setLoading,
	setCurrentUser,
	clearCurrentUser,
} from "./../actions/authActions";

const firebaseLogin = async (email, password) => {
	return await auth.signInWithEmailAndPassword(email, password);
};

const firebaseSignup = async (email, password) => {
	return await auth.createUserWithEmailAndPassword(email, password);
};

export function* signupHandler(data) {
	yield put(setLoading(true));

	const { email, password } = data.payload.userData;
	const { history } = data.payload;

	try {
		const user = yield call(firebaseSignup, email, password);
		yield put(setLoading(false));
		yield put(setCurrentUser(user));
		alert("Welcome User");
		history.push("/");
	} catch (error) {
		yield put(setLoading(false));
		alert(error.message);
	}
}

export function* loginHandler(data) {
	yield put(setLoading(true));

	const { email, password } = data.payload.userData;
	const { history } = data.payload;
	try {
		const user = yield call(firebaseLogin, email, password);
		yield put(setCurrentUser(user.user));
		yield put(setLoading(false));
		alert("Welcome User");
		history.push("/");
	} catch (error) {
		yield put(setLoading(false));
		console.error("Error: ", error);
		alert(error.message);
	}
}

export function* logoutHandler() {
	yield put(setLoading(true));

	try {
		yield put(clearCurrentUser());
		alert("Logged out");
	} catch (error) {
		console.error(error);
	}

	yield put(setLoading(false));
}

export default function* watchAuthActions() {
	yield takeEvery(LOGIN_USER, loginHandler);
	yield takeEvery(SIGNUP_USER, signupHandler);
	yield takeEvery(LOGOUT_USER, logoutHandler);
}
