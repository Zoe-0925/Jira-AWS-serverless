import {
    FILTER_BY_EPIC, FILTER_BY_LABEL, FILTER_BY_ASSIGNEE, CLEAN_FILTER, GROUP_BY
} from "../Actions/filter.actions"

const initialState = {
    none: true,
    epicFilter: "",
    labelFilter: "",
    assigneeFilter: "",
    groupBy: ""
}
export default function FilterReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER_BY_EPIC:
            return { ...state, epicFilter: action.data, none: false }
        case FILTER_BY_LABEL:
            return { ...state, labelFilter: action.data, none: false }
        case FILTER_BY_ASSIGNEE:
            return { ...state, assigneeFilter: action.data, none: false }
        case GROUP_BY:
            return { ...state, groupBy: action.data}
        case CLEAN_FILTER:
            return initialState
        default:
            return state
    }
}