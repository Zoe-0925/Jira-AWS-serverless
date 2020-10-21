import { v4 as uuidv4 } from 'uuid'


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

const mockLabels = [
    {
        _id: "1",
        name: "mock label 1",
        project: "1"
    },
    {
        _id: "2",
        name: "mock label 2",
        project: "1"
    },
]


/****************************************************************************/


//export const GET_LABEL_BY_ID = "GET_LABEL_BY_ID"
//export const GET_ALL_LABELS = "GET_ALL_LABELS"

/**    Thunk Actions    */
export function createLabel(data, token) {
    return dispatch => {
        dispatch({ type: LOADING_LABEL })
        let newData = Object.assign({}, data)
        newData._id = uuidv4()
        dispatch(createSuccessfulLabel(newData))
    }
}

export function deleteLabel(id, token) {
    return  dispatch => {
        dispatch({ type: LOADING_LABEL })
        dispatch(deleteSuccessfulLabel(id))
    }
}

export function getAllLabels(projectId, token) {
    return  dispatch => {
        dispatch({ type: LOADING_LABEL })
        dispatch(appendSuccessfulLabels(mockLabels))
    }
}