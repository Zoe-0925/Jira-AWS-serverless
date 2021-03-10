import {
	LOGIN, LOGOUT, ADD_OTHER_USERS, CLEAR
} from "../actions/user.actions"

const initialState = {
	currentUserId: "",
	users: []
}

const UserReducer = (state = initialState, action) => {
	let newState = { ...state }
	switch (action.type) {
		case ADD_OTHER_USERS:
			newState.users = newState.users.concat(action.data)
			return newState
		case LOGIN:
			if (typeof action.data === Array) { return newState }
			newState.currentUserId = action.data._id
			newState.users.push(action.data)
			return newState
		case LOGOUT:
			return initialState
		case CLEAR:
			return initialState
		default:
			return state
	}
}

export default UserReducer