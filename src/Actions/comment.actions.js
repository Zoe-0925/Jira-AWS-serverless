import axios from 'axios'
import Util from "../Components/Util"
require('dotenv').config()

const { post, put, jwtConfig } = Util

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
export const getCommentsForIssue = (issueId, token) => async  dispatch => {
    dispatch({ type: LOADING_COMMENT })
    try {
        const response = await dispatch(fetchCommentsForIssue(process.env.BASE, issueId, token))
        if (response.data.success) {
            dispatch(appendSuccessfulComments(response.data))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const createComment = (data, token) => async  dispatch => {
    dispatch({ type: LOADING_COMMENT })
    try {
        const response = await dispatch(fetchCreateComment(process.env.BASE, data, token))
        if (response.data.success) {
            let newData = Object.assign({}, data)
            newData._id = response.id
            dispatch(createSuccessfulComment(newData))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const updateComment = (data, token) => async  dispatch => {
    dispatch({ type: LOADING_COMMENT })
    try {
        const response = await dispatch(fetchUpdateComment(process.env.BASE, data, token))
        if (response.data.success) {
            dispatch(updateSuccessfulComment(data))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const deleteComment = (data, token) => async  dispatch => {
    dispatch({ type: LOADING_COMMENT })
    try {
        const response = await dispatch(fetchUpdateComment(process.env.BASE, data, token))
        if (response.data.success) {
            dispatch(deleteSuccessfulComment(data))
        }
        else {
            dispatch(dispatchError(response.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

/**********************************  API Call Actions  ******************************************/
export function fetchCreateComment(BASE, item, token) {
    return post("/comments/", BASE, item, token)
}

export function fetchCommentById(BASE, id, token) {//fetch a Comment
    return axios.get(BASE + '/comments/' + id, jwtConfig(token));
}

export function fetchAllComments(BASE, id, token) {//fetch all Comments in a project
    return axios.get(BASE + '/comments/project/' + id, jwtConfig(token));
}

export function fetchCommentsForIssue(BASE, id, token) {//fetch all Comments in an issue
    return axios.get(BASE + '/comments/issue/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export function fetchUpdateComment(BASE, update, token) {//fetch all projects of a Comment
    return put("/comments/" + update._id, BASE, update, token)
}

export function fetchDeleteCommentById(BASE, id, token) {//fetch all projects of a Comment
    return axios.delete(BASE + '/comments/' + id, jwtConfig(token));
}

