import {
    CREATE_COMMENT,
    DELETE_COMMENT,
    APPEND_COMMENTS,
    UPDATE_COMMENT_DESCRIPTION,
    DELETE_COMMENT_BY_ISSUE
} from "../Actions/comment.actions"

const initialState = {
    comments: [],
}

export default function CommentReducer(state = initialState, action) {
    let newState = { ...state }
    let tempComments
    switch (action.type) {
        case CREATE_COMMENT:
            newState.comments.push(action.data)
            return newState
        case DELETE_COMMENT:
            tempComments = newState.comments.filter(item => item._id !== action.id)
            newState.comments = tempComments
            return newState
        case APPEND_COMMENTS:
            tempComments = newState.comments.concat(action.data)
            newState.comments = tempComments
            return newState
        case UPDATE_COMMENT_DESCRIPTION:
            let comment = newState.comments.find(item => item._id === action.data._id)
            comment.description = action.data.description
            return newState
        case DELETE_COMMENT_BY_ISSUE:
            newState.comments.filter(item => item.issue !== action.id)
            return newState
        case "CLEAR_COMMENT":
            return initialState
        default:
            return state;
    }
};
