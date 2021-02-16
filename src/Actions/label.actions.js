import { dispatchError, LOADING, AUTHENTICATED } from "./loading.actions"
import { removeLabelFromIssues } from "./issue.actions"

export const CREATE_LABEL = "CREATE_LABEL"
export const DELETE_LABEL = "DELETE_LABEL"
export const APPEND_LABELS = "APPEND_LABELS"
export const DELETE_LABEL_BY_PROJECT = "DELETE_LABEL_BY_PROJECT"

/******************************** Thunk Actions ****************************************/
export const getProjectLabels = (projectId) => async  dispatch => {
    try {
        let labels = []  //TODO fix
        dispatch({
            type: APPEND_LABELS,
            data: labels
        })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const chainDeleteLabel = (id) => async  dispatch => {
    try {
        await Promise.all([
            dispatch({ type: LOADING }),
            await dispatch(removeLabelFromIssues(id))
        ])
        dispatch(deleteLabel(id))
        dispatch({ type: AUTHENTICATED })
    }
    catch (err) {
        dispatch(dispatchError(err))
    }
}

export const createLabel = (newLabel) => async  dispatch => {
    await dispatch({
        type: CREATE_LABEL,
        data: newLabel
    })
}

export const deleteLabel = (id) => async  dispatch => {
    await dispatch({
        type: DELETE_LABEL,
        id: id
    })
}

