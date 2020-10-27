import API from '@aws-amplify/api';

export const LOADING_COMMENT = "LOADING_COMMENT"
export const ERROR_COMMENT = "ERROR_COMMENT"
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

export function dispatchError() {
    return {
        type: ERROR_COMMENT
    }
}


/**********************************  Thunk Actions  ******************************************/
export const getCommentsForIssue = (issueId) => async  dispatch => {
    dispatch({ type: LOADING_COMMENT })
    try {
        const data = API.get("CommentApi", "/comments/issue/" + issueId)
        if (data.error === undefined) {
            dispatch(appendSuccessfulComments(data))
        }
        else {
            dispatch(dispatchError(data.error))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createComment = (newComment) => async  dispatch => {
    dispatch({ type: LOADING_COMMENT })
    try {
        const data = API.post("CommentApi", "/comments", {
            body: newComment
        })
        if (data.error === undefined) {
            dispatch(createSuccessfulComment(newComment))
        }
        else {
            dispatch(dispatchError(data.error))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const updateComment = (comment) => async  dispatch => {
    dispatch({ type: LOADING_COMMENT })
    try {
        const data = API.put("CommentApi", "/comments", {
            body: comment
        })
        if (data.error === undefined) {
            dispatch(updateSuccessfulComment(comment))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteComment = (id) => async  dispatch => {
    dispatch({ type: LOADING_COMMENT })
    try {
        const data = await API.del("CommentApi", "/comments/" + id)
        if (data.error === undefined) {
            dispatch(deleteSuccessfulComment(id))
        }
        else {
            dispatch(dispatchError(data.error))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

