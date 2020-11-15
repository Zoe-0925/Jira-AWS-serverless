import API from '@aws-amplify/api';
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { removeLabelFromIssues } from "./issue.actions"

export const CREATE_LABEL = "CREATE_LABEL"
export const DELETE_LABEL = "DELETE_LABEL"
export const APPEND_LABELS = "APPEND_LABELS"
export const DELETE_LABEL_BY_PROJECT = "DELETE_LABEL_BY_PROJECT"

/******************************** Thunk Actions ****************************************/
export const chainDeleteLabel = (id) => async  dispatch => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch(deleteLabel(id)),
            dispatch(removeLabelFromIssues(id))
        ])
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getProjectLabels = (projectId) => async  dispatch => {
    try {
        const labels = await API.get("LabelApi", "/labels/project/" + projectId)
        dispatch({
            type: APPEND_LABELS,
            data: labels
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createLabel = (newLabel) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        await API.post("LabelApi", "/labels", {
            body: newLabel
        })
        dispatch({
            type: CREATE_LABEL,
            data: newLabel
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteLabel = (id) => async  dispatch => {
    try {
        await API.del("LabelApi", "/labels/" + id)
        dispatch({
            type: DELETE_LABEL,
            id: id
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const getAllLabels = (projectId) => async  dispatch => {
    dispatch({ type: LOADING })
    try {
        const data = await API.get("LabelApi", "/labels/project" + projectId)
        dispatch(appendSuccessfulLabels(data))
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteLabelByProject = (projectId) => async dispatch => {
    try {
        await API.del("LabelApi", "/labels/project/" + projectId)
        dispatch({
            type: DELETE_LABEL_BY_PROJECT,
            id: projectId
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}