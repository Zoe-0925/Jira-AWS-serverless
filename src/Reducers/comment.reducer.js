
import { CLEAR_COMMENT, CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT_DESCRIPTION, 
    APPEND_COMMENTS, DELETE_COMMENT_BY_ISSUE } from "../Actions/comment.actions"

const initialState = {
    comments: []
}
/**
 *  description: "",
    issue: "",
    user: "",
    createdDate: "",
 */

export default function CommentReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case CREATE_COMMENT:
            newState.comments.push(action.data)
            return { comments: newState.comments }
        case DELETE_COMMENT:
            newState.comments.filter(comment => comment._id !== action.id)
            return { comments: newState.comments }
        case UPDATE_COMMENT_DESCRIPTION:
            let comment = newState.comments.find(c => c._id === action.id)
            comment.description = action.data
            return { comments: newState.comments }
        case APPEND_COMMENTS:
            return { comments: action.data || [] }
        case DELETE_COMMENT_BY_ISSUE:
            newState.comments.filter(comment => comment.issue !== action.id)
            return { comments: newState.comments }
        case CLEAR_COMMENT:
            return initialState
        default:
            return state;
    }
};

