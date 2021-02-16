import API from '@aws-amplify/api';
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"

export const CREATE_COMMENT = "CREATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPDATE_COMMENT_DESCRIPTION = "UPDATE_COMMENT_DESCRIPTION"
export const APPEND_COMMENTS = "APPEND_COMMENTS"
export const APPEND_COMMENTS_CHILDREN = "APPEND_COMMENTS_CHILDREN"
export const DELETE_COMMENT_BY_PROJECT = "DELETE_COMMENT_BY_PROJECT"
export const GET_COMMENT_BY_ID = "GET_COMMENT_BY_ID"
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS"
export const DELETE_COMMENT_BY_ISSUE = "DELETE_COMMENT_BY_ISSUE"

/**********************************  Actions  ******************************************/


export function deleteSuccessCommentByProject(id) {
    return {
        type: DELETE_COMMENT_BY_PROJECT,
        id: id
    }
}

/**********************************  Thunk Actions  ******************************************/
export const getCommentsForIssue = (issueId) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        const data = await API.get("CommentApi", "/comments/issue/" + issueId)
        dispatch({
            type: APPEND_COMMENTS,
            data: data
        })
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createComment = (newComment) => async dispatch => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            API.push("CommentApi", "/comments/", { body: newComment })
        ])

        dispatch({ type: AUTHENTICATED })
    } catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateCommentDescription = (data) => async dispatch => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            API.put("CommentApi", "/comments/description", { body: data })
        ])
        dispatch(updateCommentDescription(data))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteComment = (id) => async dispatch => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            API.del("CommentApi", "/comments/object/" + id)
        ])
        dispatch(deleteCommentAction(id))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO
export const deleteCommentByProject = (projectId) => async  dispatch => {

}

//TODO
export const deleteCommentByIssue = (issueId) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        //TODO
        //update batch write item and update the api call
        dispatch({
            type: "DELETE_PROJECT"
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createCommentAction = newComment => async dispatch => {
    await dispatch({
        type: CREATE_COMMENT,
        data: newComment
    })
}

export const updateCommentAction = data => async dispatch => {
    await dispatch({
        type: UPDATE_COMMENT_DESCRIPTION,
        data: data
    })
}

export const deleteCommentAction = id => async dispatch => {
    await dispatch({
        type: DELETE_COMMENT,
        id: id
    })
}