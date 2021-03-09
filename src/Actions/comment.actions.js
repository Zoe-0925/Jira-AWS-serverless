import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { v4 as uuidv4 } from 'uuid'
import { generateDateString, formatDate } from "../Components/Util"

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
        dispatch({ type: LOADING })
        dispatch({ type: CREATE_COMMENT, data: { ...newComment, _id: uuidv4() , createdAt: createdAt }})
        dispatch({ type: AUTHENTICATED })
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateCommentDescription = (data) => async dispatch => {
    try {
        dispatch({ type: LOADING })
        dispatch({ type: UPDATE_COMMENT_DESCRIPTION, data: data })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteComment = (id) => async dispatch => {
    try {
        dispatch({ type: LOADING })
        dispatch({ type: DELETE_COMMENT, id: id })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
export const deleteCommentByIssue = (issueId) => async dispatch => {
    try {
        dispatch({ type: LOADING })
        dispatch({ DELETE_COMMENT_BY_ISSUE, id: issueId })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}
