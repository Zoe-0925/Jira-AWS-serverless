import {
    CREATE_SUCCESS_LABEL,
    DELETE_SUCCESS_LABEL,
    APPEND_SUCCESS_LABELS,
    DELETE_LABEL_BY_PROJECT
} from "../Actions/label.actions"

const testState = {
    labels: [{ _id: "xxx", name: "test label1" }]
}

const initialState = {
    labels: []
}

export default function LabelReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case CREATE_SUCCESS_LABEL:
            return { labels: [...newState.labels, action.data] }
        case DELETE_SUCCESS_LABEL:
            return { labels: newState.labels.filter(item => item._id !== action.id) }
        case APPEND_SUCCESS_LABELS:
            return { labels: newState.labels.concat(action.data) }
        case DELETE_LABEL_BY_PROJECT:
            return initialState
        default:
            return state;
    }
};

