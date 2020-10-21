import {
    CREATE_SUCCESS_LABEL,
    DELETE_SUCCESS_LABEL,
    APPEND_SUCCESS_LABELS,
    LOADING_LABEL,
    ERROR_LABEL
} from "../Actions/label.actions"

export default function LabelReducer(state = {
    loading: false,
    authenticated: false,
    errorMessage: "",
    labels: [{_id:"xxx",name:"test label1"}]
}, action) {
    let newState
    let newLabels
    switch (action.type) {
        case LOADING_LABEL:
            return Object.assign({}, state, { loading: true, errorMessage: "" })
        case CREATE_SUCCESS_LABEL:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newLabels = [...newState.labels, action.data]
            newState.labels = newLabels
            return newState
        case DELETE_SUCCESS_LABEL:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newLabels = newState.labels.filter(item => item._id !== action.id)
            newState.labels = newLabels
            return newState
        case APPEND_SUCCESS_LABELS:
            newState = Object.assign({}, state, { loading: false, authenticated: true })
            newLabels =  newState.labels.concat(action.data)
            newState.labels = newLabels
            return newState
        case ERROR_LABEL:
            return Object.assign({}, state, { loading: false, authenticated: false, errorMessage: action.data })
        default:
            return state;
    }


};

