import {
    LOADING_STATUS, ERROR_STATUS, CREATE_SUCCESS_STATUS, DELETE_SUCCESS_STATUS,
    UPDATE_SUCCESS_STATUS, UPDATE_SUCCESS_STATUS_NAME, APPEND_SUCCESS_STATUS, MOVE_ISSUES,
    DELETE_ISSUE_FROM_STATUS, DELETE_STATUS_BY_PROJECT, UPDATE_ISSUE_ORDER
} from "../Actions/status.actions"

const status = new Map()
status.set("1", { _id: "1", name: "TO DO", issues: ["hdkahdjaskdh"] })
status.set("2", { _id: "2", name: "IN PROGRESS", issues: [] })
status.set("3", { _id: "3", name: "DONE", issues: [] })
status.set("4", { _id: "4", name: "TEST", issues: [] })

const testState = {
    loading: false,
    authenticated: false,
    status: status,
    errorMessage: ""
}

const initialState = {
    loading: false,
    authenticated: false,
    status: [],
    errorMessage: ""
}
export default function StatusReducer(state = initialState, action) {
    let newState = Object.assign({}, state, { loading: false, authenticated: true })
    let status
    switch (action.type) {
        case LOADING_STATUS:
            return Object.assign({}, state, { loading: true, authenticated: false })
        case CREATE_SUCCESS_STATUS:
            newState.status.set(action.data._id, action.data)
            return newState
        case DELETE_SUCCESS_STATUS:
            newState.status.detele(action.id)
            return newState
        case UPDATE_SUCCESS_STATUS:
            newState.status.set(action.data._id, action.data)
            return newState
        case UPDATE_SUCCESS_STATUS_NAME:
            status = newState.status.get(action.data._id)
            status.name = action.data.name
            newState.status.set(action.data._id, status)
            return newState
        case UPDATE_ISSUE_ORDER:
            status = newState.status.get(action._id)
            status.issues = action.issueOrder
            newState.status.set(action._id, status)
            return newState
        case MOVE_ISSUES:
            let sourceStatus = newState.status.get(action.source._id)
            sourceStatus.issues = action.source.issueOrder
            let destinationStatus = newState.status.get(action.destination._id)
            destinationStatus.issues = action.destination.issueOrder
            newState.status.set(action.source._id, sourceStatus)
            newState.status.set(action.destination._id, destinationStatus)
            return newState
        case APPEND_SUCCESS_STATUS:
            return { ...state, loading: false, authenticated: true, status: action.data }
        case DELETE_ISSUE_FROM_STATUS:
            const newIssueList = newState.status.get(action.statusId).issues.filter(id => id !== action.issueId)
            newState.status.get(action.statusId).issues = newIssueList
            return newState
        case DELETE_STATUS_BY_PROJECT:
            newState.status.clear()
            return newState
        case ERROR_STATUS:
            return { ...state, loading: false, authenticated: false, errorMessage: action.data }
        default:
            return state;
    }
};

