import {
    CREATE_LABEL,
    DELETE_LABEL,
    APPEND_LABELS
} from "../Actions/label.actions"

/** 
const testState = {
    labels: [{ _id: "xxx", name: "test label1" }]
} */

const initialState = {
    labels: []
}

export default function LabelReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case CREATE_LABEL:
            return { labels: [...newState.labels, action.data] }
        case DELETE_LABEL:
            return { labels: newState.labels.filter(item => item._id !== action.id) }
        case APPEND_LABELS:
            return { labels: newState.labels.concat(action.data) }
        case "CLEAR_LABEL":
            return initialState
        default:
            return state;
    }
};

