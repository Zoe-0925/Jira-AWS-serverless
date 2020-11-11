import API from '@aws-amplify/api';
import { dispatchError, LOADING } from "./loading.actions"

export const CREATE_SUCCESS_COMMENT = "CREATE_SUCCESS_COMMENT"
export const DELETE_SUCCESS_COMMENT = "DELETE_SUCCESS_COMMENT"
export const UPDATE_SUCCESS_COMMENT = "UPDATE_SUCCESS_COMMENT"
export const APPEND_SUCCESS_COMMENTS = "APPEND_SUCCESS_COMMENTS"
export const APPEND_SUCCESS_COMMENTS_CHILDREN = "APPEND_SUCCESS_COMMENTS_CHILDREN"

export const CREATE_COMMENT = "CREATE_COMMENT"
export const GET_COMMENT_BY_ID = "GET_COMMENT_BY_ID"
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT = "UPDATE_COMMENT"
export const DELETE_COMMENT_BY_PROJECT = "DELETE_COMMENT_BY_PROJECT"
export const DELETE_COMMENT_BY_ISSUE = "DELETE_COMMENT_BY_ISSUE"

/**********************************  Actions  ******************************************/
export function appendSuccessfulComments(data) {
    return {
        type: APPEND_SUCCESS_COMMENTS,
        data: data
    }
}

export function createSuccessfulComment(data) {
    return {
        type: CREATE_SUCCESS_COMMENT,
        data: data
    }
}

export function deleteSuccessfulComment(id) {
    return {
        type: DELETE_SUCCESS_COMMENT,
        id: id
    }
}

export function updateSuccessfulComment(data) {
    return {
        type: UPDATE_SUCCESS_COMMENT,
        data: data
    }
}

export function deleteSuccessCommentByProject(id) {
    return {
        type: DELETE_COMMENT_BY_PROJECT,
        id: id
    }
}

export function deleteSuccessCommentByIssue(id) {
    return {
        type: DELETE_COMMENT_BY_ISSUE,
        id: id
    }
}


/**********************************  Thunk Actions  ******************************************/
export const getCommentsForIssue = (issueId) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        const data = await API.get("CommentApi", "/comments/issue/" + issueId)
        dispatch(appendSuccessfulComments(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createComment = (newComment) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.post("CommentApi", "/comments", {
            body: newComment
        })
        dispatch(createSuccessfulComment(newComment))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateComment = (comment) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.put("CommentApi", "/comments", {
            body: comment
        })
        dispatch(updateSuccessfulComment(comment))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteComment = (id) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.del("CommentApi", "/comments/" + id)
        dispatch(deleteSuccessfulComment(id))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteCommentByProject = (projectId) => async  dispatch => {

}

export const deleteCommentByIssue = (issueId) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        //TODO
        //update batch write item and update the api call
        dispatch(deleteSuccessCommentByProject(issueId))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

