import {
    CREATE_SUCCESS_LABEL,
    DELETE_SUCCESS_LABEL,
    APPEND_SUCCESS_LABELS,
    LOADING_LABEL,
    ERROR_LABEL, DELETE_LABEL_BY_PROJECT
} from "../Actions/label.actions"

export default function LabelReducer(state = {
    loading: false,
    authenticated: false,
    errorMessage: "",
    labels: [{ _id: "xxx", name: "test label1" }]
}, action) {
    let newState = { ...state, loading: false, authenticated: true }
    let newLabels
    switch (action.type) {
        case LOADING_LABEL:
            return { ...state, loading: true, authenticated: false }
        case CREATE_SUCCESS_LABEL:
            newState.labels = [...newState.labels, action.data]
            return newState
        case DELETE_SUCCESS_LABEL:
            newLabels = newState.labels.filter(item => item._id !== action.id)
            newState.labels = newLabels
            return newState
        case APPEND_SUCCESS_LABELS:
            newLabels = newState.labels.concat(action.data)
            newState.labels = newLabels
            return newState
        case DELETE_LABEL_BY_PROJECT:
            return { ...state, loading: false, authenticated: true, labels: [] }
        case ERROR_LABEL:
            return { ...state,  loading: false, authenticated: false, errorMessage: action.data }
        default:
            return state;
    }


};

