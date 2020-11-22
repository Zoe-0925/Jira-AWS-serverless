import API from '@aws-amplify/api';
import { dispatchError, LOADING } from "./loading.actions"

export const CREATE_COMMENT = "CREATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"
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
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createComment = (newComment) => dispatch => {
    dispatch({ type: LOADING })
    dispatch({
        type: CREATE_COMMENT,
        data: newComment
    })
}

export const updateCommentDescription = (comment) => dispatch => {
    dispatch({ type: LOADING })
    dispatch({
        type: UPDATE_COMMENT,
        data: comment
    })
}

export const deleteComment = (id) => dispatch => {
    dispatch({ type: LOADING })
    dispatch({
        type: DELETE_COMMENT,
        id: id
    })
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
