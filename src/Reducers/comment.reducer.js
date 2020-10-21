import {
    CREATE_SUCCESS_COMMENT,
    DELETE_SUCCESS_COMMENT,
    APPEND_SUCCESS_COMMENTS,
    UPDATE_SUCCESS_COMMENT,
    LOADING_COMMENT,
    ERROR_COMMENT
} from "../Actions/comment.actions"

//TODO intial state should be from the local storage???
const initialState = {
    loading: false,
    authenticated: false,
    comments: [],
    errorMessage: ""
}

export default function CommentReducer(state = initialState, action) {
    let newState
    let tempComments
    switch (action.type) {
        case LOADING_COMMENT:
            return Object.assign({}, state, { loading: true })
        case CREATE_SUCCESS_COMMENT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.comments.push(action.data)
            return newState
        case DELETE_SUCCESS_COMMENT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempComments = newState.comments.filter(item => item._id !== action.id)
            newState.comments = tempComments
            return newState
        case APPEND_SUCCESS_COMMENTS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempComments = newState.comments.concat(action.data)
            newState.comments = tempComments
            return newState
        case UPDATE_SUCCESS_COMMENT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempComments = newState.comments.filter(item => item._id !== action.data._id)
            tempComments.push(action.data)
            newState.comments = tempComments
            return newState
        case ERROR_COMMENT:
            return Object.assign({}, state, { loading: false, authenticated: false ,errorMessage:action.data})
        default:
            return state;
    }


};
