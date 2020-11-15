import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    APPEND_COMMENTS,
    UPDATE_COMMENT
} from "../Actions/comment.actions"

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
        case CREATE_COMMENT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newState.comments.push(action.data)
            return newState
        case DELETE_COMMENT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempComments = newState.comments.filter(item => item._id !== action.id)
            newState.comments = tempComments
            return newState
        case APPEND_COMMENTS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempComments = newState.comments.concat(action.data)
            newState.comments = tempComments
            return newState
        case UPDATE_COMMENT:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            tempComments = newState.comments.filter(item => item._id !== action.data._id)
            tempComments.push(action.data)
            newState.comments = tempComments
            return newState
        default:
            return state;
    }
};
