import {
	LOADING_USER,
	ERROR_USER,
	UPDATE_USER, LOGIN, LOGOUT,
	ADD_OTHER_USERS, UPDATE_PROJECTS, CANCEL_LOADING_USER
} from "../Actions/user.actions"

const testState = {
	loading: false,
	authenticated: false,
	currentUserId: "testUserId",
	users: [{ _id: "testUserId", name: "userName", email: "test email", projects: [] }],
	errorMessage: ""
}
const initialState = {
	loading: false,
	authenticated: false,
	currentUserId: "",
	users: [],
	errorMessage: ""
}

const UserReducer = (state = initialState, action) => {
	let newState = Object.assign({}, state, { loading: false, authenticated: true })
	switch (action.type) {
		case LOADING_USER:
			return Object.assign({}, state, { loading: true, authenticated: false })
		case ADD_OTHER_USERS:
			newState.users = newState.users.concat(action.data)
			return newState
		case UPDATE_PROJECTS:
			newState.users.find(user => user._id === newState.currentUserId).projects = action.data
			return newState
		case LOGIN:
			if (typeof action.data === Array) { return newState }
			newState.currentUserId = action.data._id
			newState.users.push(action.data)
			return newState
		case LOGOUT:
			return initialState
		case CANCEL_LOADING_USER:
			return newState
		case ERROR_USER:
			return Object.assign({}, state, { loading: false, authenticated: false, errorMessage: action.data })
		case UPDATE_USER:
			let tempUsers = newState.users.filter(item => item._id === action.data._id)
			tempUsers.push(action.data)
			newState.users = tempUsers
			return newState
		default:
			return state
	}
}

export default UserReducer