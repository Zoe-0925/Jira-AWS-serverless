import { v4 as uuidv4 } from 'uuid'

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

export function deleteSuccessfulComments(id) {
    return {
        type: DELETE_SUCCESS_COMMENTS,
        id: id
    }
}

export function updateSuccessfulComments(data) {
    return {
        type: UPDATE_SUCCESS_COMMENTS,
        data: data
    }
}
/**********************************  Thunk Actions  ******************************************/
export function getCommentsForIssue(issueId, token) {
    return dispatch => {
        dispatch({ type: LOADING_COMMENT })
        const data = {
            _id: "test id",
            author: "test author id",
            description: "Mock Comment",
            date: new Date(),
            issue: "1",
            parent: ""
        }
        dispatch(appendSuccessfulComments(data))
    }
}

export function createComment(data, token) {
    return dispatch => {
        dispatch({ type: LOADING_COMMENT })
        let newData = Object.assign({}, data)
        newData._id = uuidv4()
        dispatch(createSuccessfulComment(newData))
    }
}

export function updateComment(data, token) {
    return dispatch => {
        dispatch({ type: LOADING_COMMENT })
        dispatch(updateSuccessfulComment(data))
    }
}

export function deleteComment(data, token) {
    return  dispatch => {
        dispatch({ type: LOADING_COMMENT })
        dispatch(deleteSuccessfulComments(data))
    }
}
