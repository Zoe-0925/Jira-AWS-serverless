import {
    CREATE_STATUS, DELETE_STATUS,
    APPEND_STATUS, MOVE_ISSUE, APPEND_NEW_ISSUE,
    DELETE_ISSUE_FROM_STATUS, UPDATE_ISSUE_ORDER, UPDATE_STATUS_ATTRIBUTE
} from "../Actions/status.actions"

const initialState = {
    status: []
}

export default function StatusReducer(state = initialState, action) {
    let newState = { ...state }
    let status
    switch (action.type) {
        case CREATE_STATUS:
            newState.status = [...newState.status, action.data]
            return newState
        case DELETE_STATUS:
            newState.status.filter(remainingStatus => remainingStatus._id !== action.id)
            return newState
        case UPDATE_STATUS_ATTRIBUTE:
            status = newState.status.find(aStatus => aStatus._id === action._id)
            status[action.attribute] = action.value
            return newState
        case APPEND_NEW_ISSUE:
            status = newState.status.find(aStatus => aStatus._id === action.status)
            status.issues = [...status.issues, action.issue]
            return newState
        case UPDATE_ISSUE_ORDER:
            status = newState.status.find(aStatus => aStatus._id === action._id)
            status = { ...status, issues: action.value }
            return newState
        case MOVE_ISSUE:
            let sourceStatus = newState.status.find(aStatus => aStatus._id === action.source._id)
            sourceStatus.issues = action.source.value
            let destinationStatus = newState.status.find(aStatus => aStatus._id === action.destination._id)
            destinationStatus.issues = action.destination.value
            return newState
        case APPEND_STATUS:
            newState.status = action.data
            return newState
        case DELETE_ISSUE_FROM_STATUS:
            status = newState.status.find(aStatus => aStatus._id === action.statusId)
            status.issues.filter(id => id !== action.issueId)
            return newState
        case "CLEAR_STATUS":
            return initialState
        default:
            return state;
    }
};

