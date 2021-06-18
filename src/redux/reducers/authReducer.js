import {
	CLEAR_CURRENT_USER,
	SET_CURRENT_USER,
	SET_AUTH_LOADING,
} from "./../actions/types";
const objectIsEmpty = (obj) => {
	return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};
const initialState = {
	loading: false,
	isAuthenticated: false,
	user: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_AUTH_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !objectIsEmpty(action.payload),
				user: action.payload,
			};
		case CLEAR_CURRENT_USER:
			return {
				...state,
				isAuthenticated: false,
				user: {},
			};
		default:
			return state;
	}
};

export default reducer;
