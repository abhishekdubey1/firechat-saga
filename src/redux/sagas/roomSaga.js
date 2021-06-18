import { takeEvery, put, call, fork } from "redux-saga/effects";
import slugify from "slugify";

import { rsf, db } from "./../../firebaseInit";

import {
	SYNC_ROOMS,
	SYNC_ROOMS_SUCCESS,
	SYNC_ROOMS_FAIL,
	DELETE_ROOM_START,
	ADD_NEW_ROOM,
	SYNC_MESSAGES,
	SYNC_MESSAGES_SUCCESS,
	SYNC_MESSAGES_FAIL,
	ADD_NEW_MESSAGE,
} from "./../actions/types";

import {
	setRoomsLoading,
	setMessagesLoading,
	syncRoomsSuccess,
	syncRoomFailure,
	setRoomsInStore,
	syncMessagesSuccess,
	syncMessagesFailure,
	setMessagessInStore,
} from "./../actions/roomActions";

const createRoomCollection = async (roomName, creator) => {
	const slug = slugify(roomName, { lower: true, strict: true });
	return await db.collection("rooms").doc(slug).set({
		name: roomName,
		slug: slug,
		timestamp: Date.now(),
		creator,
	});
};

const createMessageDocument = async (conversationId, email, message) => {
	return await db
		.collection(`rooms/${conversationId}/messages`)
		.add({ email, message, timestamp: Date.now() });
};

const getRoomCreator = async (id) => {
	return await db.collection("rooms").doc(id).get();
};
const deleteRoomCollection = async (id, user) => {
	return await db.collection("rooms").doc(id).delete();
};

export function* getRoomsInRealTime() {
	yield put(setRoomsLoading(true));

	// Get response after calling firebase
	yield fork(rsf.firestore.syncCollection, "rooms", {
		successActionCreator: syncRoomsSuccess,
		failureActionCreator: syncRoomFailure,
	});
}

export function* getRoomsSuccess({ querySelector }) {
	yield put(setRoomsLoading(false));

	let allRooms = {};
	querySelector.forEach((doc) => {
		allRooms = { ...allRooms, [doc.id]: doc.data() };
	});

	yield put(setRoomsInStore(allRooms));
}

export function* createNewRoom({ roomName, creator }) {
	yield put(setRoomsLoading(true));

	try {
		yield call(createRoomCollection, roomName, creator);
		alert("Room Created Successfully");
	} catch (error) {
		console.error(error);
		alert(error.message);
	}

	yield put(setRoomsLoading(false));
}

export function* deleteOldRoom({ id, user }) {
	yield put(setRoomsLoading(true));
	yield put(setMessagesLoading(true));

	try {
		const doc = yield call(getRoomCreator, id);
		if (doc.exists) {
			const { creator } = doc.data();
			if (creator === user) {
				yield call(deleteRoomCollection, id, user);
				alert("Room Deleted Successfully");
			} else {
				alert("You can't delete this room");
			}
		} else {
			alert("No such document");
		}
	} catch (error) {
		alert(error.message);
		console.error(error);
	}

	yield put(setRoomsLoading(false));
	yield put(setMessagesLoading(false));
}

export function* getRoomsFailure({ error }) {
	yield put(setRoomsLoading(false));

	alert(error.message);
}

export function* getMessagesInRealTime({ id }) {
	yield put(setMessagesLoading(true));

	const messageColRef = db.collection(`rooms/${id}/messages`);

	yield fork(rsf.firestore.syncCollection, messageColRef.orderBy("timestamp"), {
		successActionCreator: syncMessagesSuccess,
		failureActionCreator: syncMessagesFailure,
	});
}

export function* getMessagesSuccess({ querySelector }) {
	yield put(setMessagesLoading(false));

	let allMessages = {};
	querySelector.forEach((doc) => {
		allMessages = { ...allMessages, [doc.id]: doc.data() };
	});

	yield put(setMessagessInStore(allMessages));
}

export function* getMessagesFailure({ error }) {
	yield put(setRoomsLoading(false));

	alert(error.message);
}

export function* createNewMessage({ conversationId, email, message }) {
	try {
		yield call(createMessageDocument, conversationId, email, message);
	} catch (error) {
		console.error(error);
		alert(error.message);
	}
}

export default function* watchRoomsActions() {
	yield takeEvery(SYNC_ROOMS, getRoomsInRealTime);
	yield takeEvery(SYNC_ROOMS_SUCCESS, getRoomsSuccess);
	yield takeEvery(SYNC_ROOMS_FAIL, getRoomsFailure);

	yield takeEvery(ADD_NEW_ROOM, createNewRoom);
	yield takeEvery(ADD_NEW_MESSAGE, createNewMessage);
	yield takeEvery(DELETE_ROOM_START, deleteOldRoom);

	yield takeEvery(SYNC_MESSAGES, getMessagesInRealTime);
	yield takeEvery(SYNC_MESSAGES_SUCCESS, getMessagesSuccess);
	yield takeEvery(SYNC_MESSAGES_FAIL, getMessagesFailure);
}
