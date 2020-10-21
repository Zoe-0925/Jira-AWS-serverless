import { v4 as uuidv4 } from 'uuid'
import {batch} from "react-redux"

export const LOADING_STATUS = "LOADING_STATUS"
export const ERROR_STATUS = "ERROR_STATUS"
export const CREATE_SUCCESS_STATUS = "CREATE_SUCCESS_STATUS"
export const DELETE_SUCCESS_STATUS = "DELETE_SUCCESS_STATUS"
export const UPDATE_SUCCESS_STATUS = "UPDATE_SUCCESS_STATUS"
export const APPEND_SUCCESS_STATUS = "APPEND_SUCCESS_STATUS"

export const CREATE_STATUS = "CREATE_STATUS"
export const GET_STATUS_BY_ID = "GET_STATUS_BY_ID"
export const GET_ALL_STATUS = "GET_ALL_STATUS"
export const UPDATE_STATUS = "UPDATE_STATUS"
export const DELETE_STATUS = "UPDATE_STATUS"
export const DELETE_ISSUE_FROM_STATUS = "DELETE_ISSUE_FROM_STATUS"

export const createSuccessfulStatus = (data) => {
    return {
        type: CREATE_SUCCESS_STATUS,
        data: data
    }
}

export const updateSuccessfulStatus = (data) => {
    return {
        type: UPDATE_SUCCESS_STATUS,
        data: data
    }
}

export const deleteSuccessfulStatus = (id, issues) => {
    return {
        type: DELETE_SUCCESS_STATUS,
        id: id,
        issues: issues
    }
}

export function dispatchError(id) {
    return {
        type: DELETE_SUCCESS_STATUS,
        id: id
    }
}

/**************************** Thunk Actions ***************************/
export function createStatus(data) {
    return async dispatch => {
        dispatch({ type: LOADING_STATUS })
        data._id = uuidv4()
        dispatch(createSuccessfulStatus(data))
    }
}

export function updateStatus(data) {
    return async dispatch => {
        batch(() => {
            dispatch({ type: LOADING_STATUS })
            dispatch(updateSuccessfulStatus(data))
        })
    }
}

export function deleteStatus(id) {
    return async  dispatch => {
        dispatch({ type: LOADING_STATUS })
        dispatch(deleteSuccessfulStatus(id))
    }
}

export function getAllStatus(projectId) {
    return async  dispatch => {
        dispatch({ type: LOADING_STATUS })
        const allStatus = [
            {
                _id: "1",
                name: "TO DO",
                project: "1"
            },
            {
                _id: "2",
                name: "IN PROGRESS",
                project: "1"
            },
            {
                _id: "3",
                name: "DONE",
                project: "1"
            },
            {
                _id: "4",
                name: "TEST",
                project: "1"
            },
        ]
        dispatch(createSuccessfulStatus(allStatus))
    }
}