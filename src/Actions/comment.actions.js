import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { v4 as uuidv4 } from 'uuid'
import { generateDateString } from "../Components/Util"

export const CREATE_COMMENT = "CREATE_COMMENT"
export const CLEAR_COMMENT = "CLEAR_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPDATE_COMMENT_DESCRIPTION = "UPDATE_COMMENT_DESCRIPTION"
export const APPEND_COMMENTS = "APPEND_COMMENTS"
export const DELETE_COMMENT_BY_ISSUE = "DELETE_COMMENT_BY_ISSUE"

/**********************************  Thunk Actions  ******************************************/

export const createComment = (newComment) => async dispatch => {
    try {
        let createdAt = generateDateString()
        dispatch({ type: CREATE_COMMENT, data: { ...newComment, _id: uuidv4() , createdAt: createdAt }})
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateCommentDescription = (data) => async dispatch => {
    try {
        dispatch({ type: UPDATE_COMMENT_DESCRIPTION, data: data })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteComment = (id) => async dispatch => {
    try {
        dispatch({ type: DELETE_COMMENT, id: id })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
export const deleteCommentByIssue = (issueId) => async dispatch => {
    try {
        dispatch({ DELETE_COMMENT_BY_ISSUE, id: issueId })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}
