import axios from 'axios'
import Util from "../Components/Util"
require('dotenv').config()

const { post, put, jwtConfig } = Util


export const LOADING_LABEL = "LOADING_LABEL"
export const ERROR_LABEL = "ERROR_LABEL"
export const CREATE_SUCCESS_LABEL = "CREATE_SUCCESS_LABEL"
export const DELETE_SUCCESS_LABEL = "DELETE_SUCCESS_LABEL"
export const APPEND_SUCCESS_LABELS = "APPEND_SUCCESS_LABELS"

/********************** Actions *******************/

export function createSuccessfulLabel(data) {
    return {
        type: CREATE_SUCCESS_LABEL,
        data: data
    }
}

export function appendSuccessfulLabels(data) {
    return {
        type: APPEND_SUCCESS_LABELS,
        data: data
    }
}


export function deleteSuccessfulLabel(data) {
    return {
        type: DELETE_SUCCESS_LABEL,
        data: data
    }
}


export function dispatchError(data) {
    return {
        type: ERROR_LABEL,
        data: data
    }
}




/****************************************************************************/


//export const GET_LABEL_BY_ID = "GET_LABEL_BY_ID"
//export const GET_ALL_LABELS = "GET_ALL_LABELS"

/**    Thunk Actions    */
export const createLabel = (data, token) => async  dispatch => {
    dispatch({ type: LOADING_LABEL })
    try {
        const response = await dispatch(fetchCreateLabel(process.env.BASE, data, token))
        if (response.data.success) {
            data._id = response.data.data.id
            dispatch(createSuccessfulLabel(data))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const deleteLabel = (id, token) => async  dispatch => {
    dispatch({ type: LOADING_LABEL })
    try {
        const response = await dispatch(deleteLabelById(process.env.BASE, id, token))
        if (response.data.success) {
            dispatch(deleteSuccessfulLabel(id))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
    }
}

export const getAllLabels = (projectId, token) => async  dispatch => {
    dispatch({ type: LOADING_LABEL })
    try {
        const response = await dispatch(fetchAllLabels(process.env.BASE, projectId, token))
        if (response.data.success) {
            dispatch(appendSuccessfulLabels(response.data.data))
        }
        else {
            dispatch(dispatchError(response.data.message))
        }
    }
    catch (err) {
        dispatch(dispatchError(err))
        console.log('Error', err);
    }
}
/****************************************************************************/

/**    API Call Actions    */
export function fetchCreateLabel(BASE, item, token) {
    return post("/labels/", BASE, item, token)
}

export function fetchLabelById(BASE, id, token) {//fetch all projects of a Label
    return axios.get(BASE + '/labels/' + id, jwtConfig(token));
}

export function fetchAllLabels(BASE, id, token) {//fetch all labels in a project
    return axios.get(BASE + '/labels/project/' + id, jwtConfig(token));
}

//TODO not sure if it's useful. Maybe delete later
export function fetchUpdateLabel(BASE, id, update, token) {//fetch all projects of a Label
    return put("/labels/" + id, BASE, update, token)
}

export function deleteLabelById(BASE, id, token) {//fetch all Labels of a Label
    return axios.delete(BASE + '/labels/' + id, jwtConfig(token));
}

