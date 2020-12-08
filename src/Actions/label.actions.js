import API from '@aws-amplify/api';
import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { removeLabelFromIssues } from "./issue.actions"

export const CREATE_LABEL = "CREATE_LABEL"
export const DELETE_LABEL = "DELETE_LABEL"
export const APPEND_LABELS = "APPEND_LABELS"
export const DELETE_LABEL_BY_PROJECT = "DELETE_LABEL_BY_PROJECT"

/******************************** Thunk Actions ****************************************/

//TODO
//Since removeLabelFromIssues is involved
//needs to update the payload for the web socket
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
    try {
        const payload = {
            type: CREATE_LABEL,
            data: newLabel
        }
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch({ type: NEW_MESSAGE, payload: payload })])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const deleteLabel = (id) => async  dispatch => {
    try {
        const payload = {
            type: DELETE_LABEL,
            id: id
        }
        await Promise.all([
            dispatch({ type: LOADING }),
            dispatch({ type: NEW_MESSAGE, payload: payload })])
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

//TODO 
//Check this later
export const deleteLabelByProject = (projectId) => async dispatch => {
    try {
        dispatch({
            type: "DELETE_PROJECT"
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}



export const fetchDeleteLabelByProject = async projectId => {
    await API.del("LabelApi", "/labels/project/" + projectId)
}