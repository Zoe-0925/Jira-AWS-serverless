
import { CLEAR_COMMENT, CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT_DESCRIPTION, APPEND_COMMENTS, DELETE_COMMENT_BY_ISSUE } from "../Actions/comment.actions"

const initialState = {
    description: "",
    issue: "",
    user: "",
    createdDate: "",
}

export default function CommentReducer(state = initialState, action) {
    let newState = { ...state }
    let task
    switch (action.type) {

        case CLEAR_COMMENT:
            return initialState
        default:
            return state;
    }
};

