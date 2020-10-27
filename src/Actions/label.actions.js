import API from '@aws-amplify/api';

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

/******************************** Thunk Actions ****************************************/

export const saveProjectLabels = labels => async  dispatch => {
    dispatch({ type: LOADING_LABEL })
    try {
        dispatch(appendSuccessfulLabels(labels))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createLabel = (newLabel) => async  dispatch => {
    dispatch({ type: LOADING_LABEL })
    try {
        await API.post("LabelApi", "/labels", {
            body: newLabel
        })
        dispatch(createSuccessfulLabel(newLabel))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteLabel = (id) => async  dispatch => {
    dispatch({ type: LOADING_LABEL })
    try {
        await API.del("LabelApi", "/labels/" + id)
        dispatch(deleteSuccessfulLabel(id))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getAllLabels = (projectId) => async  dispatch => {
    dispatch({ type: LOADING_LABEL })
    try {
        const data = await API.get("LabelApi", "/labels/project" + projectId)
        dispatch(appendSuccessfulLabels(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}
