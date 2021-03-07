import { dispatchError, loadingContainer } from "./loading.actions"
import { comments } from "../Data"
import { v4 as uuidv4 } from 'uuid'

export const CREATE_COMMENT = "CREATE_COMMENT"
export const CLEAR_COMMENT = "CLEAR_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPDATE_COMMENT_DESCRIPTION = "UPDATE_COMMENT_DESCRIPTION"
export const APPEND_COMMENTS = "APPEND_COMMENTS"
export const DELETE_COMMENT_BY_ISSUE = "DELETE_COMMENT_BY_ISSUE"

/**********************************  Thunk Actions  ******************************************/

export const getCommentsForIssue = (issueId) => async dispatch => {
    try {
        const data = comments.filter(items => items.issue === issueId)
        dispatch(loadingContainer({
            type: APPEND_COMMENTS,
            data: data
        }))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createComment = (newComment) => async dispatch => {
    try {
        const commentWithId = { ...newComment, _id: uuidv4() }
        dispatch(loadingContainer({ type: CREATE_COMMENT, data: commentWithId }))
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateCommentDescription = (data) => async dispatch => {
    try {
        dispatch(loadingContainer({ type: UPDATE_COMMENT_DESCRIPTION, data: data }))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteComment = (id) => async dispatch => {
    try {
        dispatch(loadingContainer({ type: DELETE_COMMENT, id: id }))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
export const deleteCommentByIssue = (issueId) => async dispatch => {
    try {
        dispatch(loadingContainer({  DELETE_COMMENT_BY_ISSUE, id: issueId }))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}
