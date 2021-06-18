import {
  SET_ROOMS,
  SET_ROOMS_LOADING,
  SYNC_ROOMS,
  SYNC_ROOMS_SUCCESS,
  SYNC_ROOMS_FAIL,
  ADD_NEW_ROOM,
  DELETE_ROOM,
  DELETE_ROOM_START,
  SET_MESSAGES_LOADING,
  SYNC_MESSAGES,
  SYNC_MESSAGES_SUCCESS,
  SYNC_MESSAGES_FAIL,
  ADD_NEW_MESSAGE,
  SET_MESSAGES,
} from "./types";

// LOADING ACTIONS

export const setRoomsLoading = (status) => ({
  type: SET_ROOMS_LOADING,
  payload: status,
});

export const setMessagesLoading = (status) => ({
  type: SET_MESSAGES_LOADING,
  payload: status,
});

// ROOM ACTIONS

export const setRoomsInStore = (payload) => ({
  type: SET_ROOMS,
  payload: payload,
});

export const syncRoomsCollection = () => ({
  type: SYNC_ROOMS,
});

export const syncRoomsSuccess = (querySelector) => ({
  type: SYNC_ROOMS_SUCCESS,
  querySelector,
});

export const syncRoomFailure = (error) => ({
  type: SYNC_ROOMS_FAIL,
  error,
});

export const addNewRoom = (roomName) => ({
  type: ADD_NEW_ROOM,
  roomName: roomName,
});

export const deleteRoom = () => ({
  type: DELETE_ROOM,
});

export const deleteRoomStart = (id) => ({
  type: DELETE_ROOM_START,
  id,
});

// MESSAGES ACTIONS

export const setMessagessInStore = (payload) => ({
  type: SET_MESSAGES,
  payload: payload,
});

export const syncMessagesCollection = (id) => ({
  type: SYNC_MESSAGES,
  id,
});

export const syncMessagesSuccess = (querySelector) => ({
  type: SYNC_MESSAGES_SUCCESS,
  querySelector,
});

export const syncMessagesFailure = (error) => ({
  type: SYNC_MESSAGES_FAIL,
  error,
});

export const sendMessage = (conversationId, email, message) => ({
  type: ADD_NEW_MESSAGE,
  conversationId,
  email,
  message,
});
