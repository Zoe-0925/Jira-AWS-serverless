import {
    FILTER_BY_EPIC, FILTER_BY_LABEL, FILTER_BY_ASSIGNEE, CLEAN_FILTER, GROUP_BY,
    ADD_EPIC, REMOVE_EPIC
} from "../Actions/filter.actions"

const initialState = {
    none: true,
    epicFilter: "",
    labelFilter: "",
    assigneeFilter: "",
    groupBy: ""
}
export default function FilterReducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case ADD_EPIC:
            newState.epicFilter.push(action.id)
            return newState
        case REMOVE_EPIC:
            newState.epicFilter.filter(item => item !== action.id)
            return newState
        case FILTER_BY_EPIC:
            return { ...state, epicFilter: action.data, none: false }
        case FILTER_BY_LABEL:
            return { ...state, labelFilter: action.data, none: false }
        case FILTER_BY_ASSIGNEE:
            return { ...state, assigneeFilter: action.data, none: false }
        case GROUP_BY:
            return { ...state, groupBy: action.data }
        case CLEAN_FILTER:
            return initialState
        default:
            return state
    }
}